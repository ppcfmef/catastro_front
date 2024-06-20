import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import { Captcha } from 'app/shared/interfaces/captcha.interface';
import { CaptchaService } from 'app/shared/services/captcha.service';
import { environment } from 'environments/environment';
import moment from 'moment';

moment.locale('es');
@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    styleUrls  : ['./sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };

    alertCaptcha: any = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    captcha: Captcha;
    captchaImage: any;
    
    versionCodigo1: number = environment.versionCodigo1;
    versionCodigo2: number = environment.versionCodigo2;
    versionCodigo3: number = environment.versionCodigo3 ;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _captchaService: CaptchaService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {   this.getCaptcha();
        // Create the form
        this.signInForm = this._formBuilder.group({
            username  : ['', [Validators.required]],
            password  : ['', Validators.required],
            captcha : [ null, Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    async signIn(): Promise<void>
    {

        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        const payload: any = this.signInForm.getRawValue();
        if(this.captcha){
            payload.captcha_key=this.captcha.captchaKey;
            payload.captcha_value=payload.captcha;
        }

        payload.token = await this.getTokenByCaptcha();
        // Sign in
        this._authService.signIn(payload)
            .subscribe(
                () => {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Usuario o contraseña incorrecta'
                    };

                    // Show the alert
                    this.showAlert = true;
                    if( response && response.error && response.error.nonFieldErrors && response.error.nonFieldErrors[0]){
                        this.alertCaptcha ={
                            type   : 'error',
                            message: 'Valor del Captcha Invalido'
                        };
                    }

                    this.getCaptcha();
                }
            );
    }

    async getTokenByCaptcha(): Promise<string> {
        return;
    }
    getCaptcha(): void{
        this._captchaService.getCaptcha().subscribe((result: Captcha)=>{
            if(result){
                this.captcha = result;

                //this.captchaImage=btoa(String.fromCharCode.apply(null, new Uint8Array(this.captcha.captchaImage)));

                //this.captchaImage= btoa(JSON.stringify(this.captcha.captchaImage));
                //console.log(' this.captchaImage>>', this.captchaImage);
            }
        });
    }

    onUpdateCaptcha(event: any): void {

        this.getCaptcha();
    }

    get f(): {[key: string]: AbstractControl} {
        return this.signInForm.controls;
    }
}
