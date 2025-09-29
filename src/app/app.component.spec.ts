import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FeaturesService } from './features.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('AppComponent', () => {
  let mockFeaturesService: jasmine.SpyObj<FeaturesService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockFeaturesService = jasmine.createSpyObj('FeaturesService', ['fetchFeatures', 'setFeatures', 'getFeatures']);
    mockFeaturesService.fetchFeatures.and.returnValue(of({ enableGrpc: false }));
    mockFeaturesService.getFeatures.and.returnValue({ enableGrpc: false });

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: FeaturesService, useValue: mockFeaturesService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'AdminPanelFrontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AdminPanelFrontend');
  });

  it('should fetch features on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(mockFeaturesService.fetchFeatures).toHaveBeenCalled();
  });

  it('should not show gRPC button when feature is disabled', () => {
    mockFeaturesService.getFeatures.and.returnValue({ enableGrpc: false });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[mat-button]')?.textContent).not.toContain('Try gRPC');
  });

  it('should show gRPC button when feature is enabled', () => {
    mockFeaturesService.getFeatures.and.returnValue({ enableGrpc: true });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[mat-button]')?.textContent).toContain('Try gRPC');
  });
});
