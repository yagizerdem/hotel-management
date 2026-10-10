import Icon from '@/components/Icon'

export default function Inventory() {
  return (
    <>
            <div className="flex flex-col w-full pb-12">
              <div className="w-full bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <span>Inventory & Operations</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                      <span className="text-secondary font-semibold">Room Management</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                      <span>4 Floors / 77 Room Matrix</span>
                    </div>
                    <div className="flex items-center gap-space-sm mt-0.5">
                      <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Room Inventory Control</h1>
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-mono-data text-[11px] font-bold">LIVE OPERATIONS</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <div className="flex items-center bg-surface-container-low p-1 gap-1">
                      <button className="px-2.5 py-1 text-on-surface bg-surface-container-lowest shadow-sm font-label-sm text-label-sm font-semibold transition-colors" type="button">All Floors (4)</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">Floor 4</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">Floor 3</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">Floor 2</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">Floor 1</button>
                    </div>
                    <div className="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>
                    <div className="flex items-center bg-surface-container-low p-1 gap-1">
                      <button className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-on-secondary font-label-sm text-label-sm shadow-sm transition-all" type="button">
                        <Icon name="grid_view" className="text-[16px]" />
                        <span>Room Matrix</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1 text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm transition-all" type="button">
                        <Icon name="view_agenda" className="text-[16px]" />
                        <span>Table List</span>
                      </button>
                    </div>
                    <button className="px-3 py-1.5 bg-primary-container text-surface-container-lowest hover:bg-primary font-label-sm text-label-sm font-medium flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                      <Icon name="published_with_changes" className="text-[16px]" />
                      <span>Bulk Status Change</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm pt-2">
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Total Rooms</span>
                      <Icon name="apartment" className="text-outline text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-mono-data">77</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">4 Floor Block</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-primary h-1" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Occupied Rooms</span>
                      <Icon name="hotel" className="text-secondary text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-secondary font-mono-data">62</span>
                      <span className="font-mono-data text-label-sm font-bold text-secondary">80.5% Occupancy</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-secondary h-1" style={{width: "80.5%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Available & Clean</span>
                      <Icon name="verified" className="text-on-secondary-container text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-secondary-container font-mono-data">9</span>
                      <span className="font-body-sm text-body-sm text-on-secondary-container font-medium">Ready to Sell</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-on-secondary-container h-1" style={{width: "11.7%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Awaiting Cleaning</span>
                      <Icon name="cleaning_services" className="text-on-tertiary-container text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-tertiary-container font-mono-data">4</span>
                      <span className="font-body-sm text-body-sm text-on-tertiary-container font-medium">Housekeeping</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-on-tertiary-container h-1" style={{width: "5.2%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between col-span-2 md:col-span-1">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Maintenance / Out of Order</span>
                      <Icon name="build" className="text-error text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-error font-mono-data">2</span>
                      <span className="font-body-sm text-body-sm text-error font-medium">Out of Service</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-error h-1" style={{width: "2.6%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-surface-container px-space-lg py-2 flex flex-wrap items-center justify-between gap-space-sm mt-3">
                <div className="flex flex-wrap items-center gap-space-md text-on-surface font-body-sm text-body-sm">
                  <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Legend:</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary-container"></span> Occupied</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-secondary"></span> Arriving</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-surface-container-lowest ring-1 ring-secondary"></span> Available & Clean</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-tertiary-fixed"></span> Dirty / Being Cleaned</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-error-container"></span> Faulty / Maintenance</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-on-tertiary-container"></span> Royal / VIP</span>
                </div>
                <div className="flex items-center gap-space-md font-mono-data text-mono-data text-outline">
                  <span className="flex items-center gap-1"><Icon name="balcony" className="text-[14px]" /> With Balcony (40 Rooms)</span>
                  <span className="flex items-center gap-1"><Icon name="kitchen" className="text-[14px]" /> Minibar Stocked (58)</span>
                  <span className="flex items-center gap-1"><Icon name="sync" className="text-[14px]" /> Auto-refresh: 30s</span>
                </div>
              </div>
              <div className="w-full mt-3 flex flex-col xl:flex-row items-start gap-space-md">
                <div className="flex-1 w-full space-y- space-y-4">
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">FLOOR 04</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">4th Floor • Suite & Deluxe Wing</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">17 Rooms: 1 Royal Suite, 6 Quad, 10 Double with Balcony</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">14 Occupied</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">2 Available</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Cleaning</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer ring-2 ring-on-tertiary-container shadow-sm relative group">
                        <div className="absolute top-0 right-0 bg-on-tertiary-container text-on-tertiary px-1.5 py-0.5 font-label-sm text-[10px] uppercase font-bold tracking-widest"> ROYAL </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">401</span>
                            <Icon name="workspace_premium" className="text-[16px] text-on-tertiary-container" />
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant truncate font-semibold mt-0.5">Royal Suite Terrace</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span className="flex items-center gap-0.5" title="Balcony"><Icon name="balcony" className="text-[13px] text-secondary" /> Akdeniz</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5" title="4 Persons"><Icon name="group" className="text-[13px]" /> 4</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary font-semibold truncate">M. Weber (VIP)</span>
                            <span className="w-2 h-2 bg-secondary rounded-full" title="Occupied"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span className="text-secondary font-medium">Checked In</span>
                            <span className="text-on-secondary-container">MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">402</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">QUAD</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Family Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span className="flex items-center gap-0.5">
                              <Icon name="balcony" className="text-[13px] text-secondary" />
                            </span>
                            <span>•</span>
                            <span>4 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Cleaned (10:45)</span>
                            <span>MB: Check</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">403</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">QUAD</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Family Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-tertiary-fixed/30 -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-tertiary-fixed-variant font-bold">DIRTY / QUEUED</span>
                            <span className="w-2 h-2 bg-on-tertiary-container rounded-full animate-pulse"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Check-out: 11:00</span>
                            <span>Awaiting Attendant</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">404</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">QUAD</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Family Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Guests</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">A. Müller</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied (Night 3)</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">405</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">QUAD</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Family Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Guests</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">C. Dupont</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">406</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">QUAD</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Family Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Guests</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">J. Smith</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">407</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">H. Demir</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Missing</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">408</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">R. Novak</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">409</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">K. Lindner</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">410</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">E. Yılmaz</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">411</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Clean</span>
                            <span>MB: Stocked</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">412</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">P. Bianchi</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">413</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">G. Rossi</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">414</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">N. Varga</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">415</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">B. Kaya</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">416</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">S. Johansson</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">417</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Double</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">O. Çelik</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">FLOOR 03</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">3rd Floor • Balcony Superior Wing</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Rooms: 10 Double with Balcony (301-310), 10 Triple with Balcony - 1 Double + 1 Single (311-320)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">17 Occupied</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">1 Available</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Cleaning</span>
                        <span className="text-outline">/</span>
                        <span className="text-error font-bold">1 Out of Order (Room 312)</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">301</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Persons Balcony</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">T. Hansen</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">302</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Persons Balcony</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">D. Kowalski</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">303</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Persons Balcony</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Clean</span>
                            <span>MB: Stocked</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">304</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DOUBLE BALCONY</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Persons Balcony</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-tertiary-fixed/30 -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-tertiary-fixed-variant font-bold">AWAITING CLEANING</span>
                            <span className="w-2 h-2 bg-on-tertiary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Housekeeping</span>
                            <span>MB: Restock Needed</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-error-container/20 p-2.5 flex flex-col justify-between cursor-pointer hover:bg-error-container/30 transition-colors ring-1 ring-error shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-error font-mono-data font-bold">312</span>
                            <span className="px-1.5 py-0.2 bg-error text-on-error text-[10px] font-mono-data font-bold">OUT OF ORDER</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-error font-medium truncate mt-0.5">Triple Balcony</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="build" className="text-[13px] text-error" />
                            <span>1 Double + 1 Single</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-error text-on-error -mx-2.5 -mb-2.5 p-2 flex flex-col gap-0.5">
                          <div className="flex items-center justify-between font-label-sm text-[11px] font-bold">
                            <span>A/C MOTOR FAULT</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data opacity-90">
                            <span>Technician On the Way</span>
                            <span>14:00 Estimate</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between col-span-2 sm:col-span-1 shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">305 - 311 & 313-320</span>
                            <Icon name="grid_on" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">15 Rooms Occupied / Active Reservations</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>100% Occupancy</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">View Details</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">FLOOR 02</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">2nd Floor • Standard & Twin Wing</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Rooms: 10 Single (201-210), 10 Twin - 2 Single Beds (211-220)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">16 Occupied</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">3 Available</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Cleaning</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">201</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">SINGLE</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standard Single</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Single Bed</span>
                            <span>•</span>
                            <span>1 Person</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">M. Aydın</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">202</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">SINGLE</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standard Single</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Single Bed</span>
                            <span>•</span>
                            <span>1 Person</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Ready</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">211</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 BEDS)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Single Beds</span>
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">J. & P. Becker</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">212</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 BEDS)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Single Beds</span>
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">L. Moreau</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">213</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 BEDS)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Single Beds</span>
                            <span>•</span>
                            <span>2 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Ready</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">Other Rooms (15)</span>
                            <Icon name="summarize" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">14 Occupied, 1 Being Cleaned</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>203-210 & 214-220</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">List</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">FLOOR 01</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">1st Floor • Garden & Entrance Wing</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Rooms: 10 Single (101-110), 10 Triple - 3 Single Beds (111-120)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">15 Occupied</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">3 Available</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Cleaning</span>
                        <span className="text-outline">/</span>
                        <span className="text-error font-bold">1 In Maintenance (Room 105)</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">101</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">SINGLE</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Garden Side</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Single Bed</span>
                            <span>•</span>
                            <span>1 Person</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">A. Yıldırım</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-error-container/20 p-2.5 flex flex-col justify-between cursor-pointer hover:bg-error-container/30 transition-colors ring-1 ring-error shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-error font-mono-data font-bold">105</span>
                            <span className="px-1.5 py-0.2 bg-error text-on-error text-[10px] font-mono-data font-bold">MAINTENANCE</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-error font-medium truncate mt-0.5">Single</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="water_damage" className="text-[13px] text-error" />
                            <span>Plumbing</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-error text-on-error -mx-2.5 -mb-2.5 p-2 flex flex-col gap-0.5">
                          <div className="flex items-center justify-between font-label-sm text-[11px] font-bold">
                            <span>BATHROOM FAUCET REPLACEMENT</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data opacity-90">
                            <span>Blocked</span>
                            <span>To Be Completed Today</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">111</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 SINGLE BEDS</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Triple Garden</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Single Beds</span>
                            <span>•</span>
                            <span>3 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">K. Demir & Ark.</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Missing</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">112</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 SINGLE BEDS</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Triple Garden</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Single Beds</span>
                            <span>•</span>
                            <span>3 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">AVAILABLE & CLEAN</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Open for Sale</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">113</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 SINGLE BEDS</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Triple Garden</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Single Beds</span>
                            <span>•</span>
                            <span>3 Persons</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">F. Richter</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Occupied</span>
                            <span>MB: Full</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">Remaining 15 Rooms</span>
                            <Icon name="format_list_bulleted" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">102-104, 106-110, 114-120</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>13 Occupied / 2 Available</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">Expand</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="w-full xl:w-[420px] bg-surface-container-lowest p-space-md shadow-sm sticky top-16">
                  <div className="flex items-center justify-between pb-3 bg-surface-container-low p-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-on-tertiary-container"></span>
                      <div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider text-outline">SELECTED ROOM REVIEW</div>
                        <h3 className="font-headline-sm text-headline-sm text-primary leading-none mt-0.5">Room 401 — Royal Suite</h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-on-tertiary-container text-on-tertiary font-mono-data text-[10px] uppercase font-bold tracking-wider">VIP LEVEL</span>
                  </div>
                  <div className="mt-3 relative h-40 w-full overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover" data-alt="Luxurious Aegean panoramic royal penthouse suite in Kemer Antalya with private jacuzzi, floor-to-ceiling glass balcony, elegant Mediterranean marble bathroom, rich teak wood and maritime slate blue textiles in high-end resort lighting" src="/images/img-2.jpg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-space-sm">
                      <div className="text-surface-container-lowest">
                        <span className="font-label-sm text-[10px] tracking-wider uppercase text-secondary-fixed">4th Floor • Terrace Suite Block</span>
                        <div className="font-body-lg text-body-lg font-bold">1 King Bed + Luxury Seating Area</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-2 mt-2 font-mono-data text-[11px]">
                    <div className="flex flex-col">
                      <span className="text-outline uppercase text-[10px]">Capacity</span>
                      <span className="font-bold text-primary">4 Guests (Max)</span>
                    </div>
                    <div className="flex flex-col border-x border-outline-variant/30 px-2">
                      <span className="text-outline uppercase text-[10px]">Net Area</span>
                      <span className="font-bold text-primary">95 m² + 30m²</span>
                    </div>
                    <div className="flex flex-col pl-2">
                      <span className="text-outline uppercase text-[10px]">View</span>
                      <span className="font-bold text-secondary">Panoramic Sea View</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Room Features & Amenities</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="mode_fan" className="text-[13px] text-secondary" /> Independent A/C </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="tv" className="text-[13px] text-secondary" /> 65" Smart TV </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="wifi" className="text-[13px] text-secondary" /> Dedicated Wi-Fi 6 </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="hot_tub" className="text-[13px] text-secondary" /> Jakuzi </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="balcony" className="text-[13px] text-secondary" /> Mediterranean Terrace </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="kitchen" className="text-[13px] text-secondary" /> Premium Minibar </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="dry" className="text-[13px] text-secondary" /> Hair Dryer & Grooming Kit </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="coffee_maker" className="text-[13px] text-secondary" /> Nespresso Bar </span>
                    </div>
                  </div>
                  <div className="mt-3 bg-surface-container-low p-space-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Active Guest & Reservation</span>
                      <span className="px-1.5 py-0.5 bg-secondary text-on-secondary font-mono-data text-[10px]">RES #88419</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center font-bold text-xs">MW</div>
                        <div>
                          <div className="font-body-md text-body-md font-bold text-primary">Markus Weber</div>
                          <div className="text-[11px] text-outline font-mono-data">Germany • 2 Adults, 1 Child</div>
                        </div>
                      </div>
                      <span className="text-right font-mono-data text-[11px]">
                        <span className="text-secondary font-bold block">Ultra All Inclusive</span>
                        <span className="text-outline">24 - 30 May 2025</span>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-[11px] font-mono-data text-outline">
                      <span>Check-in: 24 May 14:10</span>
                      <span>Departure: 30 May 12:00 (6 Nights)</span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Technical & Cleaning Audit Logs</span>
                    <div className="p-2 bg-surface-container-low flex items-start justify-between text-body-sm text-body-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="cleaning_services" className="text-secondary text-[16px] mt-0.5" />
                        <div>
                          <div className="text-on-surface font-medium">Last Cleaning & Linen Change</div>
                          <div className="text-[11px] text-outline">Attendant: Fatma Şahin • Supervisor Approved</div>
                        </div>
                      </div>
                      <span className="font-mono-data text-[11px] text-on-secondary-container font-semibold">Today 11:20</span>
                    </div>
                    <div className="p-2 bg-surface-container-low flex items-start justify-between text-body-sm text-body-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="check_circle" className="text-on-secondary-container text-[16px] mt-0.5" />
                        <div>
                          <div className="text-on-surface font-medium">Technical Equipment Status</div>
                          <div className="text-[11px] text-outline">A/C, Jacuzzi, TV, Safe: Flawless</div>
                        </div>
                      </div>
                      <span className="font-mono-data text-[11px] text-secondary font-semibold">Report: OK</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-outline-variant/30 grid grid-cols-2 gap-2">
                    <button className="h-8 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm" type="button">
                      <Icon name="edit" className="text-[15px]" />
                      <span>Update Status</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="badge" className="text-[15px]" />
                      <span>Assign Cleaning</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="key" className="text-[15px]" />
                      <span>Encode Room Key</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-error/10 text-error font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="handyman" className="text-[15px]" />
                      <span>Take to Maintenance (Block)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
