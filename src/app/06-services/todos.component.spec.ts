import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set the todo items with the items get from the server', () => {
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([[1, 2, 3]]);
    });

    component.ngOnInit();

    expect(component.todos.length).toBe(3);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    const spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });


  // for this it, we can also use spyOn(service, 'add').and.returnValue(Observable.from([todo]));
  it('should add new todo that get from the server', () => {
    const todo = { id: 1 };
    const spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.from([todo]);
    });

    component.add();

    expect(component.todos).toContain(todo);
  });

  it('should set the message if server returns a error', () => {
    const spy = spyOn(service, 'add').and.returnValue(Observable.throw('error'));

    component.add();

    expect(component.message).toContain('error');
  });

  it('should call the server to delete a todo item if the user confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not call the server to delete a todo item if the user cancel', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});
