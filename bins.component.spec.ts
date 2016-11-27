/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BinsComponent, Bin }  from './bins.component';

var testData: Bin[]  =  [
  {index: 0, stat: 1},
  {index: 33, stat: 10},
  {index: 9, stat: 2},
  {index: 8, stat: 10},
  {index: 6, stat: 3},
  {index: 11, stat: 10},
  {index: 22, stat: 4},
]

describe('BinsComponent', function () {
  let de: DebugElement;
  let comp: BinsComponent;
  let fixture: ComponentFixture<BinsComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      declarations: [
        BinsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinsComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should load some bins', () => {
    comp.bins = testData
    fixture.detectChanges();
    expect(comp.bins.length).toBe(34)
    expect(comp.bounds[0]).toBe(0)
    expect(comp.bounds[1]).toBe(33)
  });

  it('should show some stuff', () => {
    comp.bins = testData
    fixture.detectChanges();
    expect(de.query(By.css('div'))).toBeDefined()
    expect(de.queryAll(By.css('span')).length).toBe(34)
  });
});
