import { ExportReportService } from "./export-report.service";
import { MessageProviderService } from "./message-provider.service";
import { MatDialogModule } from "@angular/material/dialog";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: 'app-profile',
    template: ``
})
export class TestComponent  {}

describe('UtilsTest', () => {
    let messageService: MessageProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatSnackBarModule, BrowserAnimationsModule, HttpClientModule]
        });
        messageService = TestBed.get(MessageProviderService);
    });

    it('should test', () => {
        const exportService = new ExportReportService();
        expect(exportService.getUrlExportReport("/api/v1/", {a:1, b: 2})).toBeTruthy();
        expect(messageService.showConfirm("Confirm")).toBeTruthy();
        expect(messageService.showAlert("Alert")).toBeTruthy();
        expect(messageService.showSnack("Snack")).toBeUndefined();
        expect(messageService.showSnackError("Snack Error")).toBeUndefined();
        expect(messageService.showSnackInfo("Snack Info")).toBeUndefined();
        expect(messageService.showModal(TestComponent, {})).toBeTruthy();
        expect(messageService.showModalPromise(TestComponent, {})).toBeTruthy();
    });
});
