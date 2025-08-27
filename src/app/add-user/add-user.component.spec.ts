import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AddUserComponent } from './add-user.component';
import { UsersService } from '../users.service';
import { routes } from '../app.routes';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, AddUserComponent],
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;
    expect(submitBtn.disabled).toBeTrue();
  });

  it('firstName field validity', () => {
    const input = fixture.debugElement.query(
      By.css('#first-name')
    ).nativeElement;
    input.value = 'A';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable submit when form is valid', fakeAsync(() => {
    const firstNameInput = fixture.debugElement.query(
      By.css('#first-name')
    ).nativeElement;
    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));

    const lastNameInput = fixture.debugElement.query(
      By.css('#last-name')
    ).nativeElement;
    lastNameInput.value = 'Doe';
    lastNameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    emailInput.value = 'john.doe@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const phoneInput = fixture.debugElement.query(
      By.css('#phone')
    ).nativeElement;
    phoneInput.value = '1234567890';
    phoneInput.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    tick();

    const submitBtn = fixture.debugElement.query(
      By.css('button[type=submit]')
    ).nativeElement;
    expect(submitBtn.disabled).toBeFalse();
  }));

  it('should navigate on cancel', () => {
    const spy = spyOn(router, 'navigate');
    component.onCancel();
    expect(spy).toHaveBeenCalledWith(['/users']);
  });

  it('should call addUser and navigate on success', fakeAsync(() => {
    // prepare form
    component.firstName = 'Jane';
    component.lastName = 'Smith';
    component.email = 'jane.smith@example.com';
    component.phone = '0987654321';
    fixture.detectChanges();

    const spyNav = spyOn(router, 'navigate');

    component.onSubmit();
    // expect HTTP request
    const req = httpMock.expectOne('https://localhost:7147/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
    });

    // simulate server response
    req.flush({ id: 42 });
    tick();

    expect(component.succeeded).toBeTrue();
    expect(component.message).toBe('Task queued for processing');
    expect(spyNav).toHaveBeenCalledWith(['/users']);
  }));

  it('should display error message on addUser failure', fakeAsync(() => {
    component.firstName = 'Foo';
    component.lastName = 'Bar';
    component.email = 'foo.bar@example.com';
    component.phone = '5555555';
    fixture.detectChanges();

    component.onSubmit();
    const req = httpMock.expectOne('https://localhost:7147/api/users');
    req.flush(
      { message: 'Invalid data' },
      { status: 400, statusText: 'Bad Request' }
    );
    tick();

    expect(component.succeeded).toBeFalse();
    expect(component.message).toBe('Invalid data');
  }));
});
