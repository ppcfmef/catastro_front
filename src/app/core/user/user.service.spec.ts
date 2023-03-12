import {UserService} from "./user.service";
import {Role, User, UserCreate} from 'app/core/user/user.types';

let httpClientSpy: any;
let commonService: UserService;

describe('UserServiceClass', () => {
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        commonService = new UserService(httpClientSpy);
      });

    it('should create', () => {
        const rol: Role = {id: 0, name: ""};
        const user: User = {
            username: "",
            isActive: true,
            dateJoined: "",
            role: rol,
            ubigeo: "",
            permissionsNavigation: []
        };
        expect(commonService.getUserById(5)).toBeUndefined();
        expect(commonService.getRoles({})).toBeUndefined();
        expect(commonService.getRoleById(1)).toBeUndefined();
    });
});
