import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      icon: node.icon,
      isActive: node.isActive,
      level: level,
    };
  };

  private treeControl = new FlatTreeControl<any>(
    node => node.level, node => node.expandable);

  private treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  private dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = [
      {
        name: '主页',
        url:'',
        icon:'home',
        isActive: true
      }, {
        name: '用户',
        icon: 'person',
        children: [
          {
            name: '用户列表',
            url:'/user',
            icon: 'format_list_numbered'
          },
          {
            name: '用户添加',
            url:'/user/add',
            icon: 'add_box'
          },
        ]
      },
    ];
  }

  ngOnInit() {
  }

  hasChild = (_: number, node: any) => node.expandable;

  toggleActive(node:any) {
    this.treeControl.dataNodes.forEach((dataNode,index) => {
      dataNode.isActive = false;
    });
    node.isActive = true;
  }

}
