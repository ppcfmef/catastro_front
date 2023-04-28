import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { landOwnerMock } from 'app/modules/admin/lands/land-registry/tests/mocks/land-owner.mock';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy;
  let httpClientSpyObj;

  beforeEach(() => {
    httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should forgotPassword', () => {
    httpClientSpy.post.and.returnValue(of(landOwnerMock));
    service.forgotPassword('jcramireztello@gmail.com').subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should resetPassword', () => {
    httpClientSpy.post.and.returnValue(of(landOwnerMock));
    service.resetPassword('123456').subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should signIn', () => {
    httpClientSpy.post.and.returnValue(of(landOwnerMock));
    service.signIn({ username: 'admin', password: '123456' }).subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should signInUsingToken', () => {
    httpClientSpy.post.and.returnValue(of(true));
    service.signInUsingToken().subscribe((result) => {
      expect(result).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should signUp', () => {
    httpClientSpy.post.and.returnValue(of(landOwnerMock));
    service.signUp({ name: 'Administrador', email: 'admin', password: '123456', company: '' })
    .subscribe((result) => {
      expect(result).toEqual(landOwnerMock);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

});
