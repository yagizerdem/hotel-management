import { useEffect, useRef } from 'react'
import Icon from '@/components/Icon'
import { useHotel } from '@/context/HotelProvider'

export default function Calendar() {
  const { roomCounts } = useHotel()
  const timelineRef = useRef<HTMLDivElement>(null)
  const occupancy = ((roomCounts.occupied / roomCounts.total) * 100).toFixed(1)

  // Keep today's column in view when the timeline first opens.
  useEffect(() => {
    if (timelineRef.current) timelineRef.current.scrollLeft = 240
  }, [])

  return (
    <>
            <div className="flex flex-col w-full">
              <div className="flex flex-wrap items-center justify-between gap-space-md py-space-sm bg-surface-container-low px-space-md shadow-sm">
                <div className="flex items-center gap-space-lg flex-wrap">
                  <div className="flex items-center gap-space-xs">
                    <Icon name="calendar_view_week" className="text-secondary text-[20px]" />
                    <h1 className="font-headline-sm text-headline-sm text-primary tracking-tight">Reservation Calendar & Room Occupancy Matrix</h1>
                    <span className="font-label-sm text-label-sm bg-secondary/10 text-secondary px-1.5 py-0.5 font-bold uppercase tracking-wider ml-1">PMS Live Terminal</span>
                  </div>
                  <div className="h-4 w-px bg-outline-variant/50 hidden sm:block"></div>
                  <div className="flex items-center gap-space-md text-mono-data font-mono-data text-body-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Total Capacity:</span><span className="font-semibold text-primary">{roomCounts.total} Rooms (214 Yatak)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Current Blocked:</span>
                      <span className="font-semibold text-secondary">{roomCounts.occupied} Rooms ({occupancy}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Arrivals Today:</span>
                      <span className="font-semibold text-on-surface">14</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Departures Today:</span>
                      <span className="font-semibold text-on-surface">11</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button className="h-8 px-space-md bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                    <Icon name="file_download" className="text-[16px]" />
                    <span>Export Excel / Matrix</span>
                  </button>
                  <button className="h-8 px-space-md bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                    <Icon name="print" className="text-[16px]" />
                    <span>Daily Block Slip</span>
                  </button>
                  <button className="h-8 px-space-md bg-secondary text-on-secondary hover:bg-secondary/90 font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-colors" type="button">
                    <Icon name="add_box" className="text-[16px]" />
                    <span>+ New Reservation Entry</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm shadow-sm mt-1">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <div className="flex items-center bg-surface-container-low shadow-sm">
                    <button className="h-8 px-2.5 text-on-surface hover:bg-surface-variant flex items-center transition-colors" title="Previous Week" type="button">
                      <Icon name="chevron_left" className="text-[18px]" />
                    </button>
                    <button className="h-8 px-3 text-secondary font-label-sm text-label-sm font-bold bg-surface-container-lowest hover:bg-surface-variant flex items-center gap-1 transition-colors" type="button">
                      <Icon name="today" className="text-[16px]" />
                      <span>TODAY</span>
                    </button>
                    <button className="h-8 px-2.5 text-on-surface hover:bg-surface-variant flex items-center transition-colors" title="Next Week" type="button">
                      <Icon name="chevron_right" className="text-[18px]" />
                    </button>
                  </div>
                  <div className="h-8 px-3 bg-surface-container-low flex items-center gap-2 font-mono-data text-mono-data text-primary font-semibold shadow-sm">
                    <Icon name="date_range" className="text-[16px] text-secondary" />
                    <span>19 May 2025 – 31 May 2025</span>
                    <span className="text-[11px] font-normal text-outline tracking-wider">(13 Nights / 2 Weeks)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Floor: All (77 Rooms)</option>
                        <option>1st Floor (20 Rooms)</option>
                        <option>2nd Floor (22 Rooms)</option>
                        <option>3rd Floor (20 Rooms)</option>
                        <option>4th Floor / Penthouse (15 Rooms)</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Room Type: All</option>
                        <option>Standard Single (SGL)</option>
                        <option>Standard Twin (TWN)</option>
                        <option>Double Sea View Balcony (DBL-SV)</option>
                        <option>Family Suite Triple (TRP)</option>
                        <option>Deluxe Quad (QUAD)</option>
                        <option>Royal Penthouse Suite (VIP)</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Status: All</option>
                        <option>Available Rooms</option>
                        <option>Occupied / In-House</option>
                        <option>Confirmed Reserved</option>
                        <option>Awaiting Cleaning</option>
                        <option>Maintenance / Blocked</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-md flex-wrap justify-between lg:justify-end">
                  <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-surface-container-lowest shadow-sm"></span>
                      <span>Available</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-secondary"></span>
                      <span>Reserved</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-primary"></span>
                      <span>In-House</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-tertiary-fixed-dim"></span>
                      <span>Cleaning</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-error"></span>
                      <span>Maintenance/Fault</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-on-tertiary-container"></span>
                      <span>VIP Suite</span>
                    </span>
                  </div>
                  <div className="flex items-center bg-surface-container-low shadow-sm">
                    <button className="h-7 px-2.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-variant transition-colors" type="button">Daily</button>
                    <button className="h-7 px-2.5 font-label-sm text-label-sm font-bold bg-secondary text-on-secondary transition-colors" type="button">Weekly</button>
                    <button className="h-7 px-2.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-variant transition-colors" type="button">Monthly</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-stretch overflow-hidden mt-1 bg-surface-container shadow-sm min-h-[calc(100vh-185px)]">
                <div ref={timelineRef} className="flex-1 overflow-x-auto overflow-y-auto bg-surface-container-lowest relative select-none" id="timelineScrollContainer">
                  <div className="min-w-[1380px] flex flex-col">
                    <div className="sticky top-0 z-30 flex bg-surface-container-high text-primary shadow-sm">
                      <div className="sticky left-0 z-40 w-64 min-w-[256px] max-w-[256px] bg-primary text-on-primary px-space-md py-2 flex flex-col justify-between shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">ROOM & FLOOR PLAN</span>
                          <span className="font-mono-data text-[10px] text-surface-variant">77 UNITS</span>
                        </div>
                        <div className="flex items-center justify-between text-surface-variant font-mono-data text-[11px] pt-1">
                          <span>NO / TYPE</span>
                          <span>CAPACITY / STATUS</span>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 text-center">
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">MON</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">19</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">81% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">TUE</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">20</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">84% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">WED</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">21</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">87% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">THU</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">22</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">88% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">FRI</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">23</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">91% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-secondary-fixed text-on-secondary-fixed relative font-semibold shadow-sm">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[9px] px-1.5 py-0.2 tracking-wider uppercase font-bold">TODAY</div>
                          <span className="font-mono-data text-[11px] text-secondary uppercase">SAT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-secondary">24</span>
                          <span className="font-mono-data text-[10px] text-primary font-bold mt-0.5">94% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">SUN</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">25</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">89% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">MON</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">26</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">83% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">TUE</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">27</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">79% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">WED</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">28</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">82% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">THU</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">29</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">85% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">FRI</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">30</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">92% Full</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">SAT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">31</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">96% Full</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>1ST FLOOR — GARDEN & POOL LEVEL (101 - 120)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 20 Rooms Total, 18 Occupied, 1 Available, 1 Cleaning</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Room 101</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Single (SGL)</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Garden View • Ground Floor</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold" title="Temiz">CLEAN</span>
                          <Icon name="person" className="text-outline text-[12px]" title="Capacity: 1 Guest" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        {" "}
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[0%] w-[30.76%] top-1.5 bottom-1.5 bg-primary text-on-primary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon name="key" className="text-[14px] text-secondary-fixed" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Murat Kara (O-B #8412)</span>
                          </div>
                          <span className="text-[10px] font-mono-data opacity-80 whitespace-nowrap hidden sm:inline">CHECKED OUT</span>
                        </div>
                        <div className="absolute left-[30.76%] w-[30.76%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon name="bed" className="text-[14px]" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Hans Gruber (HD #8477)</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-primary/40 px-1 whitespace-nowrap">IN-HOUSE</span>
                        </div>
                        <div className="absolute left-[76.92%] w-[23.08%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="pending_actions" className="text-[14px] text-secondary" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Ayşe Tuncer (#8540)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-secondary whitespace-nowrap">RESERVED</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Room 102</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Standard Twin</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Pool Side • Two Separate Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant px-1 font-semibold" title="Temizlikte">DIRTY</span>
                          <Icon name="group" className="text-outline text-[12px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[7.69%] w-[53.84%] top-1.5 bottom-1.5 bg-primary text-on-primary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon name="badge" className="text-[14px] text-secondary-fixed" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Elena Rostova (TP - #RZ-8495) • 2 Guests</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-mono-data text-[10px] bg-secondary px-1 text-on-secondary">ROOM KEY 2</span>
                          </div>
                        </div>
                        <div className="absolute left-[69.23%] w-[30.77%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Derviş Acar (#8562)</span>
                          <span className="text-[10px] font-mono-data text-secondary">PENDING</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>2ND FLOOR — MEDITERRANEAN PANORAMA (201 - 222)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 22 Rooms Total, 20 Occupied, 2 Confirmed Blocks</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Room 205</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Double DBL</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Sea Side • French Balcony</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">CLEAN</span>
                          <Icon name="group" className="text-outline text-[12px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[0%] w-[53.84%] top-1.5 bottom-1.5 bg-primary text-on-primary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon name="favorite" className="text-[14px] text-secondary-fixed" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Burak & Aslı Demir (Honeymoon - AI #8430)</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-on-tertiary-container text-on-tertiary px-1">VIP COMPLIMENTARY</span>
                        </div>
                        <div className="absolute left-[53.84%] w-[46.16%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="flight_land" className="text-[14px]" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Markus Weber (TUI DE #9011)</span>
                          </div>
                          <span className="text-[10px] font-mono-data opacity-90">ONLINE CHECK-IN</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Room 206</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Triple (TRP)</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Garden & Side Sea • 1 Double + 1 Single</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">CLEAN</span>
                          <Icon name="groups" className="text-outline text-[12px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[15.38%] w-[30.76%] top-1.5 bottom-1.5 bg-primary text-on-primary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="family_restroom" className="text-[14px] text-secondary-fixed" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Selçuk Kaya Family (3 Guests - #8468)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-secondary-fixed">HB</span>
                        </div>
                        <div className="absolute left-[46.15%] w-[38.46%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="luggage" className="text-[14px]" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Svetlana Petrova (Pegas #9042)</span>
                          </div>
                          <span className="text-[10px] font-mono-data">ALL INCLUSIVE</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>3RD FLOOR — DELUXE SUITES & SEA SIDE (301 - 320)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 20 Rooms Total, 17 Occupied, 1 In Maintenance, 2 Reserved</span>
                    </div>
                    <div className="flex h-11 bg-secondary/5 transition-colors group relative shadow-inner">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-secondary-fixed/40 px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-secondary">Room 304</span>
                            <span className="font-label-sm text-[10px] bg-secondary text-on-secondary px-1 font-bold">SELECTED ROOM</span>
                          </div>
                          <span className="text-[11px] text-on-surface truncate font-medium">Double Balcony • Full Sea View</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary text-on-secondary px-1.5 py-0.5 font-bold">OCCUPIED</span>
                          <Icon name="star" className="text-secondary text-[12px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/30"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[0%] w-[23.08%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between opacity-70 z-10">
                          <span className="font-mono-data text-[11px] truncate">Caner Vural (#8390)</span>
                          <span className="text-[10px] font-mono-data">DEPARTING</span>
                        </div>
                        <div className="absolute left-[23.08%] w-[38.46%] top-1 bottom-1 bg-secondary text-on-secondary px-3 flex items-center justify-between cursor-pointer shadow-md z-20">
                          <div className="flex items-center gap-2 truncate">
                            <Icon name="check_circle" className="text-[16px] text-secondary-fixed" />
                            <div className="flex flex-col truncate">
                              <span className="font-mono-data text-body-sm font-bold truncate">Ahmet Yılmaz (AI - #RZ-8492)</span>
                              <span className="text-[10px] font-mono-data opacity-90 truncate leading-none">2 Adults • Check-in: 22 May / Check-out: 27 May (5 Nights)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-[11px] bg-primary-container text-surface-container-lowest px-1.5 py-0.5 font-bold tracking-wider">IN ROOM</span>
                          </div>
                        </div>
                        <div className="absolute left-[69.23%] w-[30.77%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Kemal Soydan (#8569)</span>
                          <span className="text-[10px] font-mono-data text-secondary">PENDING</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-error">Room 312</span>
                            <span className="font-label-sm text-[10px] bg-error-container text-on-error-container px-1 font-bold">TECHNICAL BLOCK</span>
                          </div>
                          <span className="text-[11px] text-error truncate font-medium">A/C & Ventilation Overhaul</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="build" className="text-error text-[16px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[0%] w-[23.08%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between opacity-80 z-10">
                          <span className="font-mono-data text-[11px] truncate">Metehan Güner (#8388)</span>
                          <span className="text-[10px] font-mono-data">DEPARTING</span>
                        </div>
                        <div className="absolute left-[30.76%] w-[23.08%] top-1.5 bottom-1.5 bg-error-container text-on-error-container px-2 flex items-center justify-between shadow-sm z-10 cursor-not-allowed">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="engineering" className="text-[14px] text-error" />
                            <span className="font-mono-data text-[11px] font-bold truncate">Maintenance: VRF A/C Service (Work Order #TEK-109)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-error font-bold whitespace-nowrap">CLOSED</span>
                        </div>
                        <div className="absolute left-[61.54%] w-[38.46%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Alexander Novak (All-Inc #9112)</span>
                          <span className="text-[10px] font-mono-data">CONFIRMED</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="workspace_premium" className="text-[16px] mr-1.5 text-on-tertiary-container" />
                      <span>4TH FLOOR — ROYAL SUITE & ROYAL PENTHOUSE VILLAS (401 - 415)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 15 Rooms Total, 13 Occupied, VIP A La Carte Allocation</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-on-tertiary-container">Room 401</span>
                            <span className="font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold px-1">ROYAL VIP</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Penthouse Terrace • Jacuzzi • Infinity Sea View</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="diamond" className="text-on-tertiary-container text-[18px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[15.38%] w-[69.23%] top-1.5 bottom-1.5 bg-tertiary-container text-on-tertiary px-3 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-2 truncate">
                            <Icon name="diamond" className="text-[16px] text-tertiary-fixed" />
                            <span className="font-mono-data text-body-sm font-bold text-tertiary-fixed truncate">Lord Harrington & Entourage (Protocol VIP - #RZ-7701)</span>
                            <span className="text-[11px] text-surface-container-high hidden md:inline">• Private Butler Service</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-data text-[10px] bg-on-tertiary-container text-on-tertiary px-1.5 py-0.5 font-bold uppercase">ULTRA ALL INCLUSIVE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Room 402</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Deluxe Quad</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Spacious Lounge • Duplex • Private Pool</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">CLEAN</span>
                          <Icon name="family_restroom" className="text-outline text-[12px]" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 relative h-full">
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-secondary-fixed/20"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="h-full bg-surface-container-lowest"></div>
                        <div className="absolute left-[0%] w-[46.15%] top-1.5 bottom-1.5 bg-primary text-on-primary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="vpn_key" className="text-[14px] text-secondary-fixed" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Dr. Yaman Özkan (AI #8421) • 4 Guests</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-secondary px-1 text-on-secondary">IN ROOM</span>
                        </div>
                        <div className="absolute left-[53.84%] w-[46.16%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Tarık Bilgiç & Guests (#8545)</span>
                          <span className="text-[10px] font-mono-data text-secondary">EXPECTED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="w-[440px] min-w-[440px] max-w-[440px] bg-surface-container-lowest flex flex-col justify-between shadow-lg z-40 overflow-y-auto">
                  <div className="flex flex-col">
                    <div className="p-space-md bg-primary text-on-primary flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="contact_page" className="text-secondary-fixed text-[22px]" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-[11px] text-primary-fixed uppercase tracking-wider">RESERVATION FILE</span>
                          <span className="font-mono-data text-body-lg font-bold text-surface-container-lowest tracking-tight">#RZ-8492</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-[11px] bg-secondary px-2 py-0.5 text-on-secondary font-bold uppercase">CHECKED IN</span>
                        <button className="p-1 hover:bg-primary-container text-on-primary-container transition-colors" title="Close" type="button">
                          <Icon name="close" className="text-[18px]" />
                        </button>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low flex items-start gap-space-md">
                      <div className="w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-headline-sm font-bold shadow-sm"> AY </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h2 className="font-headline-sm text-headline-sm text-primary font-bold truncate">Ahmet Yılmaz</h2>
                          <span className="font-mono-data text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.2 font-semibold">VIP SILVER</span>
                        </div>
                        <span className="font-mono-data text-body-sm text-outline truncate">ID No: 382*****910 • Turkish Citizen</span>
                        <div className="flex items-center gap-space-md text-mono-data text-[11px] text-on-surface-variant pt-1">
                          <span className="flex items-center gap-1"><Icon name="call" className="text-[14px]" /> +90 532 441 ** **</span>
                          <span className="flex items-center gap-1"><Icon name="mail" className="text-[14px]" /> a.yilmaz@*****.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-sm bg-surface-container-lowest">
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">ALLOCATION & STAY INFORMATION</span>
                        <span className="font-mono-data text-[11px] text-secondary font-semibold">5 Nights / 6 Days</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-sm">
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Room Number & Type</span>
                          <span className="font-mono-data text-body-md font-bold text-primary block mt-0.5">Room 304 (3rd Floor)</span>
                          <span className="text-[11px] text-on-surface-variant">Double Balcony • Full Sea View</span>
                        </div>
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Board Type</span>
                          <span className="font-mono-data text-body-md font-bold text-secondary block mt-0.5">All Inclusive (AI)</span>
                          <span className="text-[11px] text-on-surface-variant">Early Booking 18% Disc.</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-space-sm pt-1">
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Check-in</span>
                          <span className="font-mono-data text-body-sm font-bold text-primary block">22 May 2025</span>
                          <span className="text-[11px] text-secondary font-mono-data">14:15 (Checked in)</span>
                        </div>
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Check-out</span>
                          <span className="font-mono-data text-body-sm font-bold text-primary block">27 May 2025</span>
                          <span className="text-[11px] text-outline font-mono-data">Noon 10:00 (Expected)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-body-sm pt-1 text-on-surface">
                        <span className="text-outline">Number of Guests:</span>
                        <span className="font-semibold font-mono-data">2 Adults (Ahmet Yılmaz, Deniz Yılmaz)</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface">
                        <span className="text-outline">Reservation Channel:</span>
                        <span className="font-semibold font-mono-data text-primary">Direct Web (bilgehotel.com)</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface">
                        <span className="text-outline">Room Key No:</span>
                        <span className="font-semibold font-mono-data text-secondary">RFID-CARD-304A, RFID-CARD-304B</span>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">FOLIO & PAYMENT STATUS</span>
                        <span className="font-mono-data text-[11px] bg-secondary/15 text-secondary px-1.5 py-0.5 font-bold uppercase">BALANCE CLOSED</span>
                      </div>
                      <div className="space-y-1.5 font-mono-data text-body-sm">
                        <div className="flex justify-between text-outline">
                          <span>Accommodation (5 Nights):</span>
                          <span className="text-on-surface">42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>VAT (10% Included):</span>
                          <span className="text-on-surface">3.863,64 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>Accommodation Tax (2%):</span>
                          <span className="text-on-surface">850,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>Extra Charges (Mini Bar / Spa):</span>
                          <span className="text-on-surface">0,00 ₺</span>
                        </div>
                        <div className="h-px bg-outline-variant/40 my-1"></div>
                        <div className="flex justify-between font-bold text-body-lg text-primary">
                          <span>TOTAL AMOUNT:</span>
                          <span>42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-secondary font-semibold">
                          <span>Collected (Credit Card / 3D Secure):</span>
                          <span>42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline font-semibold">
                          <span>Remaining to Collect:</span>
                          <span className="text-secondary font-bold">0,00 ₺</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-lowest space-y-1.5">
                      <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">FRONT DESK NOTES & REQUESTS</span>
                      <div className="p-2 bg-surface-container-low text-body-sm text-on-surface font-body-sm">
                        <p className="leading-relaxed">“Guest requested a high-floor, quiet room. Orthopedic and goose-down chosen from the pillow menu. Front office will be informed of the late check-out option until 12:00 on the departure day.”</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-high space-y-space-xs mt-auto shadow-sm">
                    <div className="grid grid-cols-2 gap-space-xs">
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="receipt_long" className="text-[16px]" />
                        <span>Review Folio</span>
                      </button>
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="swap_horiz" className="text-[16px]" />
                        <span>Change Room (Upgrade)</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-space-xs">
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="edit_note" className="text-[16px]" />
                        <span>Add Front Office Note</span>
                      </button>
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="credit_card" className="text-[16px]" />
                        <span>Duplicate Room Key</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-space-xs pt-1">
                      <button className="flex-1 h-9 bg-secondary text-on-secondary hover:bg-secondary/90 font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors" type="button">
                        <Icon name="logout" className="text-[18px]" />
                        <span>Quick Check-out / Process Departure</span>
                      </button>
                      <button className="h-9 px-3 bg-surface-container-lowest text-error hover:bg-error-container hover:text-on-error-container font-label-sm text-label-sm flex items-center justify-center shadow-sm transition-colors" title="Cancelled or No-Show" type="button">
                        <Icon name="cancel" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
            
    </>
  )
}
