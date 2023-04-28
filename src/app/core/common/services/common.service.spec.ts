import {CommonService} from "./common.service";

let httpClientSpy: any;
let commonService: CommonService;

describe('CommonServiceClass', () => {
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        commonService = new CommonService(httpClientSpy);
      });

    it('should create', () => {
        expect(commonService.getDepartments()).toBeUndefined();
        expect(commonService.getProvinces()).toBeUndefined();
        expect(commonService.getDistricts()).toBeUndefined();
        expect(commonService.getInstitutes()).toBeUndefined();
        expect(commonService.getDistrictResource("140101")).toBeUndefined();
    });
});
