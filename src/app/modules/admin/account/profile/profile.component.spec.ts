import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
            declarations: [ProfileComponent],
            providers: [FormBuilder]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test password', () => {
        expect(component.showPassword()).toBeUndefined();
    });

    it('should test files', () => {
        const createFile = (size = 44320, name = 'ecp-logo.png', type = 'image/png') =>
            new File([new ArrayBuffer(size)], name, {
                type: type,
            });

        const inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(createFile());
        inputFile.files = dataTransfer.files;
        const userPayload = {
            id: 0,
            avatar: "",
            fullName: "",
            password: "",
            username: "",
            jobTitle: "",
            institution: "",
            observation: "",
            dni: "",
            email: "email@email.com",
            country: "",
            language: ""
        };

        component.accountForm.setValue(userPayload);
        expect(component.uploadAvatar(inputFile.files)).toBeUndefined();
        expect(component.removeAvatar()).toBeUndefined();
        expect(component.updateInformation()).toBeUndefined();
        expect(component.executeTransaction(userPayload)).toBeTruthy();
    });
});
