import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BarchartComponent } from './barchart.component';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bar chart data on init', () => {
    const mockData = [{Id:1,Value:10},{Id:2,Value:-30}];;
    const req = httpMock.expectOne('assets/Demojson/BarChartData.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.barChart_Datapoints).toEqual(mockData);
    expect(component.barchartOption).toBeDefined();
  });

  it('should populate chart with correct data', () => {
    component.barChart_Datapoints = [{Id:1,Value:10},{Id:2,Value:-30}];
    component.populateChart();

    expect(component.barchartOption.series[0].data).toEqual([[10, 0, 'Positive Value'], [15, 2, 'Positive Value']]);
    expect(component.barchartOption.series[1].data).toEqual([[-5, 1, 'Negative Value']]);
  });

  afterEach(() => {
    httpMock.verify();
  });
});