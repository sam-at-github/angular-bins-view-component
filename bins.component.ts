import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
declare var module:any;

/**
 * The data you want to show in Bins must have this shape.
 */
export interface Bin {
  index: number;
  stat: number;
}

@Component({
  moduleId: module.id,
  selector: 'bins',
  templateUrl: 'bins.component.html',
  styleUrls: ['bins.component.css']
})
/**
 * BinsComponent is the presentation model for a view of a stat on a partition (bins/bins..) of a dataset.
 * The data exchange format is an array of Bin type where bins have a (partition) index and stat value.
 * We fill in empty bins explicitly when fetching bins API to make for loops easy in NG2.
 * BinsComponent emits two events selected([index, Bin]) and rangeSelected([s,e],[Bin]).
 */
export class BinsComponent implements OnInit
{
  private _bins:Bin[] // The bins
  private _bounds: [number, number] = [null, null] // The min/max index of bins.
  private _hue:number = 120
  private sum: number = null // Sum of stat, update when bins is.
  private min: number = null // Min stat.
  private max: number = null // Max stat.
  private selected: number = null // The selected bin in the view (master/detail).
  @Output() selection: EventEmitter<any> = new EventEmitter()

  /**
   * Options: If bounds are provided
   */
  constructor() {
    this._bins = []
  }

  ngOnInit() {
    console.log(`${this.sum}; ${this.min}; ${this.max}; ${this.bounds}`)
  }

  /**
   * Set bins we want to display.
   * To force a range, filter the input array or add bins to peg the min/max of desired range.
   */
  set bins(binsIn: Bin[]) {
    var work = binsIn.slice()
    work.sort((a,b) => a.index - b.index)
    this._bins = []
    for(let bin of work) {
      this._bins[bin.index] = bin
    }
    this.sync()
  }

  @Input() set hue(h:number) {
    this._hue = h%360
  }

  /**
   * Return a dense holey array!
   */
  get bins(): Bin[] {
    return [...this]
  }

  get bounds(): [number, number] {
    return this._bounds
  }

  get size(): number {
    return this._bins.length
  }

  /**
   * Calculate summary statistics *for the current bound* on change.
   * Assumes this._bins is in sorted order.
   */
  sync() {
    var bin:Bin
    this.sum = null
    this.min = null
    this.max = null
    this._bounds = [null,null]
    for(bin of this) {
      this.sum += bin.stat
      this.min = Math.min(this.min, bin.stat)
      this.max = Math.max(this.max, bin.stat)
      this._bounds[0] = this._bounds[0] != null  ? this._bounds[0] : bin.index
    }
    if(bin) {
      this._bounds[1] = bin.index
    }
  }

  select(index: number) {
    var bin:Bin = this.bins[index]
    if(bin) {
      this.selected = index
      this.selection.emit([index, bin])
    }
  }

  clickBin(event:any) {
    var index = parseInt(event.target.dataset['index'])
    this.select(index)
    console.log('clickBin', index)
  }

  focusBin(event:any) {
  }

  blurBin(event:any) {
  }

  /**
   * Get a color value.
   * Pretty basic, pretty bad coupling.
   */
  hsl(v:number): string {
    var l = 100 - Math.round((v/this.max)*66);
    return `hsl(${this._hue},50%,${l}%)`
  }

  /**
   * Iterate over *current bounds*.
   * If no data this.bounds return [null,null] and this yield nothing.
   */
  *[Symbol.iterator](): IterableIterator<Bin> {
    for(let i = 0; i < this._bins.length; i++) {
      yield(this._bins[i] ? this._bins[i] : {index:i, stat: 0})
    }
  }
}
