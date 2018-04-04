import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('should see two form controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();

  });

  it('should make name control required', () => {
    const control = component.form.controls['name'];

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
});
