import { Injectable } from '@angular/core';
import { ITodoList, ITodoListAddOrUpd } from '../models/todo-list.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/shared/models/response.interface';
import { retry } from 'rxjs/operators';
import { ITodoItem, ToDoItemStatus } from '../models/todo-item.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ITodoItemAdd } from './../models/todo-item.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: Observable<ITodoList[]>;
  private LIST_URL: string;
  private ITEM_URL: string;
  private readonly $todoListChange: BehaviorSubject<ITodoList[]>;
  private dataStore: { todoList: ITodoList[] };
  $todoListEditing: Subject<number>;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private notifyService: NotificationService) {
    this.LIST_URL = environment.toDoListUrl;
    this.ITEM_URL = environment.toDoItemUrl;
    this.dataStore = { todoList: [] };
    this.$todoListChange = new BehaviorSubject([]);
    this.$todoListEditing = new Subject();
    this.todoList = this.$todoListChange.asObservable();
  }

  private refresh() {
    this.$todoListChange.next(Object.assign({}, this.dataStore).todoList);
  }

  private reset() {
    this.dataStore = { todoList: [] };
  }

  public fetchToDoList() {
    return this.http.get<ITodoList[]>(this.LIST_URL)
                    .subscribe(( items: any ) =>  {
                      this.dataStore.todoList = items ? items : this.reset();
                      this.refresh();
                    });
  }

  public get ifToDoListNotNull()  {
    return this.dataStore.todoList ? true : false;
  }

  public getToDoLists(): Observable<ITodoList[]> {
    return this.$todoListChange.asObservable();
  }

  public getToDoList(index: string)  {
    if (this.ifToDoListNotNull) {
      return this.dataStore.todoList.find( element => element.id === index );
    }
  }

  public getToDoListAPI(index: string): Observable<any>{
    return this.http.get<ITodoList>(`${this.LIST_URL}/${index}`).pipe( retry(3) );
  }

  public addToDoList(list: ITodoListAddOrUpd) {
    return this.http.post<any>( this.LIST_URL, list )
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.notifyService.showSuccess(`${res.name} List Added`);
                    });
  }

  public updToDoList(itemIndex: string, item: ITodoListAddOrUpd) {
    return this.http.put<ITodoList>(`${this.LIST_URL}/${itemIndex}`, item )
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.notifyService.showSuccess(`${res.name} List Updated`);
                    });
  }

  public delToDoList(index: string) {
    return this.http.delete<any>(`${this.LIST_URL}/${index}`)
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.notifyService.showSuccess('List Deleted');
                    });
  }

  public addToDoItem(item: ITodoItemAdd) {
    return this.http.post<any>(this.ITEM_URL, item )
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.router.navigate([`/${res.toDoListId}`], {relativeTo: this.route});
                      this.notifyService.showSuccess(`${res.name} Task Added`);
                    });
  }

  public changeToDoItemStatus(item: ITodoItem) {
    item.status = this.setStatus(item.status);
    return this.http.put<ITodoItem>(`${this.ITEM_URL}/${item.id}`, item )
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.notifyService.showSuccess(`${this.getStatus(res.status)} TASK`);
                    });
  }

  public updToDoItem(itemIndex: string, item: ITodoItemAdd) {
    return this.http.put<ITodoItem>(`${this.ITEM_URL}/${itemIndex}`, item )
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.router.navigate([`/${res.toDoListId}`], {relativeTo: this.route});
                      this.notifyService.showSuccess(`${res.name} Task Updated`);
                    });
  }

  public delToDoItem(index: string) {
    return this.http.delete<any>(`${this.ITEM_URL}/${index}`)
                    .subscribe(( res ) =>  {
                      this.fetchToDoList();
                      this.notifyService.showSuccess('Task Deleted');
                    });
  }

  private setStatus(status: string){
    return (status === ToDoItemStatus.PENDING) ? ToDoItemStatus.COMPLETE : ToDoItemStatus.PENDING;
  }

  private getStatus(status: string){
    return status ? ToDoItemStatus.COMPLETE : ToDoItemStatus.PENDING;
  }

}
