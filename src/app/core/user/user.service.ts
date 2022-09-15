import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Role, User, UserCreate} from 'app/core/user/user.types';
import {IPagination} from '../common/interfaces/common.interface';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public _refreshUsers: Subject<void> = new Subject();
    public _refreshRoles: Subject<void> = new Subject();

    private _apiUrl = environment.apiUrl;
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>(`${this._apiUrl}/users/user/`).pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    /**
     * Update the user
     *
     * @param id
     */
    getUserById(id: number): Observable<User> {
        return this._httpClient.get<User>(`${this._apiUrl}/users/${id}/`);
    }


    /**
     * Get Users All
     *
     */
    getUsers(queryParams = null): Observable<IPagination<User>> {
        return this._httpClient.get<IPagination<User>>(`${this._apiUrl}/users/`, {params: queryParams});
    }

    /**
     * Users Create info
     *
     */
    createUser(payload: UserCreate): Observable<User> {
        const userFormData = this.parseJsonToFormData(payload);
        return this._httpClient.post<User>(`${this._apiUrl}/users/`, userFormData);
    }

    /**
     * Users update Info
     *
     */
    updateUserById(payload: Partial<UserCreate>): Observable<User> {
        const userFormData = this.parseJsonToFormData(payload);
        return this._httpClient.patch<User>(`${this._apiUrl}/users/${payload.id}/`, userFormData);
    }

    /**
     * Users update avatar
     *
     */
    updateAvatarUserById(id: number, payload: FormData): Observable<User> {
        return this._httpClient.patch<User>(`${this._apiUrl}/users/${id}/`, payload);
    }

    /**
     * Users delete
     *
     */
    deleteUserById(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this._apiUrl}/users/${id}/`);
    }

    /**
     * Get Users All
     *
     */
    getRoles(queryParams = null): Observable<IPagination<Role>> {
        return this._httpClient.get<IPagination<Role>>(`${this._apiUrl}/users/role/`, {params: queryParams});
    }

    /**
     * Get Role by Id
     *
     */
    getRoleById(id: number): Observable<Role> {
        return this._httpClient.get<Role>(`${this._apiUrl}/users/role/${id}/`);
    }

    /**
     * Create Role
     *
     */
    createRole(payload: Partial<Role>): Observable<Role> {
        return this._httpClient.post<Role>(`${this._apiUrl}/users/role/`, payload);
    }

    /**
     * Get Role by Id
     *
     */
    updateRoleById(payload: Partial<Role>): Observable<Role> {
        return this._httpClient.patch<Role>(`${this._apiUrl}/users/role/${payload.id}/`, payload);
    }

    /**
     * delete Role by Id
     *
     */
    deleteRoleById(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this._apiUrl}/users/role/${id}/`);
    }

    /**
     * Get Role Select
     *
     */
    getRoleSelectable(): Observable<Role[]> {
        return this._httpClient.get<Role[]>(`${this._apiUrl}/users/role/select/`);
    }

    private parseJsonToFormData(data: Partial<UserCreate>): FormData {
        const formData = new FormData();
        for (const key of Object.keys(data)) {
            if (data?.avatarFile && key === 'avatarFile') {
                formData.append('avatar', data?.avatarFile, data?.avatarFile?.name);
            }else {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }
}
