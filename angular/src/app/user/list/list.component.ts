import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {Observable, Subject} from "rxjs";
import {UserService} from "../../services/user.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {ErrorComponent} from "../../shared/error/error.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessComponent} from "../../shared/success/success.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public users$:Observable<User[]>;
  public users:User[];
  private subject = new Subject<string>();
  public displayedColumns: string[] = ['check','id', 'username', 'password','action'];
  public username:string;
  public dataSource:MatTableDataSource<User>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public selection = new SelectionModel<User>(true,[]);

  constructor(private userService:UserService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers('');
    this.users$.subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
    });
    this.subject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(async(term:string) => {
      this.users$ = await this.userService.getUsers(term);
      this.users$.subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
      });
    });
  }

  onSearch() {
    this.subject.next(this.username);
  }

  onDelete(user:User) {
    this.userService.delUser(user).subscribe(result => {
      this.ngOnInit();
    });
  }

  onMultiDelete(){
    if(this.selection.selected.length == 0){
      this.dialog.open(ErrorComponent,{data : {title : "没有任何选择",timeout:1000}});
    }else {
      this.selection.selected.map( user => {

      });
      this.dialog.open(SuccessComponent,{data : {title : `成功删除${this.selection.selected.length}条数据`,timeout:1000}});
    }
  }

  isAllSelected(){
    return this.selection.selected.length == this.dataSource.data.length;
  }

  masterToggle(){
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.map( row => {
        this.selection.select(row);
      });
  }

}
