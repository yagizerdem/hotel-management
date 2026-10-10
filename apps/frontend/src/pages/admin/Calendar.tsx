import { useEffect, useRef } from 'react'
import Icon from '../../components/Icon'
import { useHotel } from '../../context/hotelContext'

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
                    <h1 className="font-headline-sm text-headline-sm text-primary tracking-tight">Rezervasyon Takvimi & Oda Doluluk Matrisi</h1>
                    <span className="font-label-sm text-label-sm bg-secondary/10 text-secondary px-1.5 py-0.5 font-bold uppercase tracking-wider ml-1">PMS Canlı Terminal</span>
                  </div>
                  <div className="h-4 w-px bg-outline-variant/50 hidden sm:block"></div>
                  <div className="flex items-center gap-space-md text-mono-data font-mono-data text-body-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Toplam Kapasite:</span><span className="font-semibold text-primary">{roomCounts.total} Oda (214 Yatak)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Anlık Blokaj:</span>
                      <span className="font-semibold text-secondary">{roomCounts.occupied} Oda (%{occupancy})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Bugün Giriş:</span>
                      <span className="font-semibold text-on-surface">14</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline">Bugün Çıkış:</span>
                      <span className="font-semibold text-on-surface">11</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button className="h-8 px-space-md bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                    <Icon name="file_download" className="text-[16px]" />
                    <span>Excel / Matris Aktar</span>
                  </button>
                  <button className="h-8 px-space-md bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                    <Icon name="print" className="text-[16px]" />
                    <span>Günlük Blokaj Fişi</span>
                  </button>
                  <button className="h-8 px-space-md bg-secondary text-on-secondary hover:bg-secondary/90 font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-colors" type="button">
                    <Icon name="add_box" className="text-[16px]" />
                    <span>+ Yeni Rezervasyon Girişi</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm shadow-sm mt-1">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <div className="flex items-center bg-surface-container-low shadow-sm">
                    <button className="h-8 px-2.5 text-on-surface hover:bg-surface-variant flex items-center transition-colors" title="Önceki Hafta" type="button">
                      <Icon name="chevron_left" className="text-[18px]" />
                    </button>
                    <button className="h-8 px-3 text-secondary font-label-sm text-label-sm font-bold bg-surface-container-lowest hover:bg-surface-variant flex items-center gap-1 transition-colors" type="button">
                      <Icon name="today" className="text-[16px]" />
                      <span>BUGÜN</span>
                    </button>
                    <button className="h-8 px-2.5 text-on-surface hover:bg-surface-variant flex items-center transition-colors" title="Sonraki Hafta" type="button">
                      <Icon name="chevron_right" className="text-[18px]" />
                    </button>
                  </div>
                  <div className="h-8 px-3 bg-surface-container-low flex items-center gap-2 font-mono-data text-mono-data text-primary font-semibold shadow-sm">
                    <Icon name="date_range" className="text-[16px] text-secondary" />
                    <span>19 Mayıs 2025 – 31 Mayıs 2025</span>
                    <span className="text-[11px] font-normal text-outline tracking-wider">(13 Gece / 2 Hafta)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Kat: Tümü (77 Oda)</option>
                        <option>1. Kat (20 Oda)</option>
                        <option>2. Kat (22 Oda)</option>
                        <option>3. Kat (20 Oda)</option>
                        <option>4. Kat / Penthouse (15 Oda)</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Oda Tipi: Tümü</option>
                        <option>Standart Tek Kişilik (SGL)</option>
                        <option>Twin Yataklı Standart (TWN)</option>
                        <option>Çift Kişilik Deniz Balkonlu (DBL-SV)</option>
                        <option>Aile Süiti Üç Kişilik (TRP)</option>
                        <option>Deluxe Dört Kişilik (QUAD)</option>
                        <option>Royal Penthouse Suite (VIP)</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                    <div className="relative">
                      <select className="h-8 pl-2 pr-7 bg-surface-container-low text-primary font-body-sm text-body-sm outline-none cursor-pointer focus:bg-surface-container-lowest">
                        <option>Durum: Tümü</option>
                        <option>Müsait Odalar</option>
                        <option>Dolu / Konaklamada</option>
                        <option>Kesin Rezerve</option>
                        <option>Temizlik Bekliyor</option>
                        <option>Bakım / Bloke</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-md flex-wrap justify-between lg:justify-end">
                  <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-surface-container-lowest shadow-sm"></span>
                      <span>Müsait</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-secondary"></span>
                      <span>Rezerve</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-primary"></span>
                      <span>Konaklamada</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-tertiary-fixed-dim"></span>
                      <span>Temizlikte</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-error"></span>
                      <span>Bakım/Arıza</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-on-tertiary-container"></span>
                      <span>VIP Süit</span>
                    </span>
                  </div>
                  <div className="flex items-center bg-surface-container-low shadow-sm">
                    <button className="h-7 px-2.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-variant transition-colors" type="button">Günlük</button>
                    <button className="h-7 px-2.5 font-label-sm text-label-sm font-bold bg-secondary text-on-secondary transition-colors" type="button">Haftalık</button>
                    <button className="h-7 px-2.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-variant transition-colors" type="button">Aylık</button>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-stretch overflow-hidden mt-1 bg-surface-container shadow-sm min-h-[calc(100vh-185px)]">
                <div ref={timelineRef} className="flex-1 overflow-x-auto overflow-y-auto bg-surface-container-lowest relative select-none" id="timelineScrollContainer">
                  <div className="min-w-[1380px] flex flex-col">
                    <div className="sticky top-0 z-30 flex bg-surface-container-high text-primary shadow-sm">
                      <div className="sticky left-0 z-40 w-64 min-w-[256px] max-w-[256px] bg-primary text-on-primary px-space-md py-2 flex flex-col justify-between shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">ODA & KAT PLANI</span>
                          <span className="font-mono-data text-[10px] text-surface-variant">77 ÜNİTE</span>
                        </div>
                        <div className="flex items-center justify-between text-surface-variant font-mono-data text-[11px] pt-1">
                          <span>NO / TİP</span>
                          <span>KAPASİTE / DURUM</span>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-13 text-center">
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">PZT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">19</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%81 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">SAL</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">20</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%84 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">ÇAR</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">21</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%87 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">PER</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">22</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%88 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">CUM</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">23</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%91 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-secondary-fixed text-on-secondary-fixed relative font-semibold shadow-sm">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[9px] px-1.5 py-0.2 tracking-wider uppercase font-bold">BUGÜN</div>
                          <span className="font-mono-data text-[11px] text-secondary uppercase">CMT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-secondary">24</span>
                          <span className="font-mono-data text-[10px] text-primary font-bold mt-0.5">%94 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">PAZ</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">25</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%89 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">PZT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">26</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%83 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">SAL</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">27</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%79 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">ÇAR</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">28</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%82 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">PER</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">29</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%85 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">CUM</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">30</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%92 Dolu</span>
                        </div>
                        <div className="flex flex-col py-1.5 px-1 bg-surface-container-high">
                          <span className="font-mono-data text-[11px] text-outline uppercase">CMT</span>
                          <span className="font-headline-sm text-headline-sm leading-tight text-primary">31</span>
                          <span className="font-mono-data text-[10px] text-secondary font-medium mt-0.5">%96 Dolu</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>1. KAT — BAHÇE & HAVUZ KATI (101 - 120)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 20 Oda Toplam, 18 Dolu, 1 Müsait, 1 Temizlik</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Oda 101</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Tek Kişilik (SGL)</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Bahçe Manzaralı • Zemin Kat</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold" title="Temiz">TEMİZ</span>
                          <Icon name="person" className="text-outline text-[12px]" title="1 Kişi Kapasite" />
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
                          <span className="text-[10px] font-mono-data opacity-80 whitespace-nowrap hidden sm:inline">ÇIKIŞ YAPILDI</span>
                        </div>
                        <div className="absolute left-[30.76%] w-[30.76%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1.5 truncate">
                            <Icon name="bed" className="text-[14px]" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Hans Gruber (HD #8477)</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-primary/40 px-1 whitespace-nowrap">KONAKLIYOR</span>
                        </div>
                        <div className="absolute left-[76.92%] w-[23.08%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="pending_actions" className="text-[14px] text-secondary" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Ayşe Tuncer (#8540)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-secondary whitespace-nowrap">REZERVE</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Oda 102</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Standart Twin</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Havuz Cephesi • İki Ayrı Yatak</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant px-1 font-semibold" title="Temizlikte">KİRLİ</span>
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
                            <span className="font-mono-data text-[11px] font-semibold truncate">Elena Rostova (TP - #RZ-8495) • 2 Kişi</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-mono-data text-[10px] bg-secondary px-1 text-on-secondary">ODA KART 2</span>
                          </div>
                        </div>
                        <div className="absolute left-[69.23%] w-[30.77%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Derviş Acar (#8562)</span>
                          <span className="text-[10px] font-mono-data text-secondary">BEKLEMEDE</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>2. KAT — AKDENİZ PANORAMA (201 - 222)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 22 Oda Toplam, 20 Dolu, 2 Kesin Blokaj</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Oda 205</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Çift Kişilik DBL</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Deniz Cephe • Fransız Balkon</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">TEMİZ</span>
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
                            <span className="font-mono-data text-[11px] font-semibold truncate">Burak & Aslı Demir (Balayı - HŞD #8430)</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-on-tertiary-container text-on-tertiary px-1">VIP İKRAM</span>
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
                            <span className="font-mono-data text-body-lg font-bold text-primary">Oda 206</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Üç Kişilik (TRP)</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Bahçe & Yan Deniz • 1 Çift + 1 Tek</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">TEMİZ</span>
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
                            <span className="font-mono-data text-[11px] font-semibold truncate">Selçuk Kaya Ailesi (3 Kişi - #8468)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-secondary-fixed">HD</span>
                        </div>
                        <div className="absolute left-[46.15%] w-[38.46%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10 transition-all">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="luggage" className="text-[14px]" />
                            <span className="font-mono-data text-[11px] font-semibold truncate">Svetlana Petrova (Pegas #9042)</span>
                          </div>
                          <span className="text-[10px] font-mono-data">HER ŞEY DAHİL</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="layers" className="text-[16px] mr-1.5 text-secondary" />
                      <span>3. KAT — DELUXE SUITES & DENİZ CEPHESİ (301 - 320)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 20 Oda Toplam, 17 Dolu, 1 Bakımda, 2 Rezerve</span>
                    </div>
                    <div className="flex h-11 bg-secondary/5 transition-colors group relative shadow-inner">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-secondary-fixed/40 px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-secondary">Oda 304</span>
                            <span className="font-label-sm text-[10px] bg-secondary text-on-secondary px-1 font-bold">SEÇİLİ ODA</span>
                          </div>
                          <span className="text-[11px] text-on-surface truncate font-medium">Çift Balkonlu • Full Deniz</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary text-on-secondary px-1.5 py-0.5 font-bold">DOLU</span>
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
                          <span className="text-[10px] font-mono-data">ÇIKIŞ</span>
                        </div>
                        <div className="absolute left-[23.08%] w-[38.46%] top-1 bottom-1 bg-secondary text-on-secondary px-3 flex items-center justify-between cursor-pointer shadow-md z-20">
                          <div className="flex items-center gap-2 truncate">
                            <Icon name="check_circle" className="text-[16px] text-secondary-fixed" />
                            <div className="flex flex-col truncate">
                              <span className="font-mono-data text-body-sm font-bold truncate">Ahmet Yılmaz (HŞD - #RZ-8492)</span>
                              <span className="text-[10px] font-mono-data opacity-90 truncate leading-none">2 Yetişkin • Giriş: 22 May / Çıkış: 27 May (5 Gece)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-[11px] bg-primary-container text-surface-container-lowest px-1.5 py-0.5 font-bold tracking-wider">ODADA</span>
                          </div>
                        </div>
                        <div className="absolute left-[69.23%] w-[30.77%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Kemal Soydan (#8569)</span>
                          <span className="text-[10px] font-mono-data text-secondary">BEKLEMEDE</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-error">Oda 312</span>
                            <span className="font-label-sm text-[10px] bg-error-container text-on-error-container px-1 font-bold">TEKNİK BLOKAJ</span>
                          </div>
                          <span className="text-[11px] text-error truncate font-medium">Klima & Havalandırma Revizyonu</span>
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
                          <span className="text-[10px] font-mono-data">ÇIKIŞ</span>
                        </div>
                        <div className="absolute left-[30.76%] w-[23.08%] top-1.5 bottom-1.5 bg-error-container text-on-error-container px-2 flex items-center justify-between shadow-sm z-10 cursor-not-allowed">
                          <div className="flex items-center gap-1 truncate">
                            <Icon name="engineering" className="text-[14px] text-error" />
                            <span className="font-mono-data text-[11px] font-bold truncate">Bakım: VRF Klima Servisi (İş Emri #TEK-109)</span>
                          </div>
                          <span className="text-[10px] font-mono-data text-error font-bold whitespace-nowrap">KAPALI</span>
                        </div>
                        <div className="absolute left-[61.54%] w-[38.46%] top-1.5 bottom-1.5 bg-secondary text-on-secondary px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Alexander Novak (All-Inc #9112)</span>
                          <span className="text-[10px] font-mono-data">ONAYLI</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-surface-container-highest px-space-md py-1 font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider shadow-sm">
                      <Icon name="workspace_premium" className="text-[16px] mr-1.5 text-on-tertiary-container" />
                      <span>4. KAT — KRAL DAİRESİ & ROYAL PENTHOUSE VİLLALARI (401 - 415)</span>
                      <span className="ml-2 font-mono-data text-[11px] font-normal text-outline">| 15 Oda Toplam, 13 Dolu, VIP A La Carte Tahsis</span>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-on-tertiary-container">Oda 401</span>
                            <span className="font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold px-1">ROYAL VIP</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Penthouse Teras • Jakuzili • Sonsuz Deniz</span>
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
                            <span className="font-mono-data text-body-sm font-bold text-tertiary-fixed truncate">Lord Harrington & Heyeti (Protokol VIP - #RZ-7701)</span>
                            <span className="text-[11px] text-surface-container-high hidden md:inline">• Özel Butler Hizmeti</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-data text-[10px] bg-on-tertiary-container text-on-tertiary px-1.5 py-0.5 font-bold uppercase">ULTRA HER ŞEY DAHİL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-11 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group relative">
                      <div className="sticky left-0 z-20 w-64 min-w-[256px] max-w-[256px] bg-surface-container-lowest group-hover:bg-surface-container-low px-space-md flex items-center justify-between shadow-sm">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono-data text-body-lg font-bold text-primary">Oda 402</span>
                            <span className="font-label-sm text-[10px] bg-surface-variant px-1 text-on-surface">Deluxe 4 Kişilik</span>
                          </div>
                          <span className="text-[11px] text-outline truncate">Geniş Salon • Dubleks • Özel Havuz</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono-data text-[10px] bg-secondary/15 text-secondary px-1 font-semibold">TEMİZ</span>
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
                            <span className="font-mono-data text-[11px] font-semibold truncate">Dr. Yaman Özkan (HŞD #8421) • 4 Kişi</span>
                          </div>
                          <span className="text-[10px] font-mono-data bg-secondary px-1 text-on-secondary">ODADA</span>
                        </div>
                        <div className="absolute left-[53.84%] w-[46.16%] top-1.5 bottom-1.5 bg-surface-container-high text-primary px-2 flex items-center justify-between cursor-pointer hover:bg-surface-variant shadow-sm z-10">
                          <span className="font-mono-data text-[11px] font-semibold truncate">Tarık Bilgiç & Misafirleri (#8545)</span>
                          <span className="text-[10px] font-mono-data text-secondary">BEKLENİYOR</span>
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
                          <span className="font-label-sm text-[11px] text-primary-fixed uppercase tracking-wider">REZERVASYON DOSYASI</span>
                          <span className="font-mono-data text-body-lg font-bold text-surface-container-lowest tracking-tight">#RZ-8492</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-[11px] bg-secondary px-2 py-0.5 text-on-secondary font-bold uppercase">GİRİŞ YAPILDI</span>
                        <button className="p-1 hover:bg-primary-container text-on-primary-container transition-colors" title="Kapat" type="button">
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
                        <span className="font-mono-data text-body-sm text-outline truncate">T.C. Kimlik: 382*****910 • TC Vatandaşı</span>
                        <div className="flex items-center gap-space-md text-mono-data text-[11px] text-on-surface-variant pt-1">
                          <span className="flex items-center gap-1"><Icon name="call" className="text-[14px]" /> +90 532 441 ** **</span>
                          <span className="flex items-center gap-1"><Icon name="mail" className="text-[14px]" /> a.yilmaz@*****.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md space-y-space-sm bg-surface-container-lowest">
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">TAHSİS VE KONAKLAMA BİLGİSİ</span>
                        <span className="font-mono-data text-[11px] text-secondary font-semibold">5 Gece / 6 Gün</span>
                      </div>
                      <div className="grid grid-cols-2 gap-space-sm">
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Oda Numarası & Tip</span>
                          <span className="font-mono-data text-body-md font-bold text-primary block mt-0.5">Oda 304 (3. Kat)</span>
                          <span className="text-[11px] text-on-surface-variant">Çift Balkonlu • Full Deniz</span>
                        </div>
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Pansiyon Tipi</span>
                          <span className="font-mono-data text-body-md font-bold text-secondary block mt-0.5">Her Şey Dahil (HŞD)</span>
                          <span className="text-[11px] text-on-surface-variant">Erken Rezervasyon %18 İnd.</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-space-sm pt-1">
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Check-in (Giriş)</span>
                          <span className="font-mono-data text-body-sm font-bold text-primary block">22 Mayıs 2025</span>
                          <span className="text-[11px] text-secondary font-mono-data">Saat 14:15 (Girdi)</span>
                        </div>
                        <div className="p-2 bg-surface-container-low shadow-sm">
                          <span className="text-[10px] uppercase font-mono-data text-outline block">Check-out (Çıkış)</span>
                          <span className="font-mono-data text-body-sm font-bold text-primary block">27 Mayıs 2025</span>
                          <span className="text-[11px] text-outline font-mono-data">Öğlen 10:00 (Bekleniyor)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-body-sm pt-1 text-on-surface">
                        <span className="text-outline">Misafir Sayısı:</span>
                        <span className="font-semibold font-mono-data">2 Yetişkin (Ahmet Yılmaz, Deniz Yılmaz)</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface">
                        <span className="text-outline">Rezervasyon Kanalı:</span>
                        <span className="font-semibold font-mono-data text-primary">Web Direkt (bilgehotel.com)</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface">
                        <span className="text-outline">Oda Kartı No:</span>
                        <span className="font-semibold font-mono-data text-secondary">RFID-CARD-304A, RFID-CARD-304B</span>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">FOLYO VE ÖDEME DURUMU</span>
                        <span className="font-mono-data text-[11px] bg-secondary/15 text-secondary px-1.5 py-0.5 font-bold uppercase">BAKİYE KAPALI</span>
                      </div>
                      <div className="space-y-1.5 font-mono-data text-body-sm">
                        <div className="flex justify-between text-outline">
                          <span>Konaklama Bedeli (5 Gece):</span>
                          <span className="text-on-surface">42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>KDV (%10 Dahil):</span>
                          <span className="text-on-surface">3.863,64 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>Konaklama Vergisi (%2):</span>
                          <span className="text-on-surface">850,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline">
                          <span>Ekstra Harcamalar (Mini Bar / Spa):</span>
                          <span className="text-on-surface">0,00 ₺</span>
                        </div>
                        <div className="h-px bg-outline-variant/40 my-1"></div>
                        <div className="flex justify-between font-bold text-body-lg text-primary">
                          <span>TOPLAM TUTAR:</span>
                          <span>42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-secondary font-semibold">
                          <span>Tahsil Edilen (Kredi Kartı / 3D Secure):</span>
                          <span>42.500,00 ₺</span>
                        </div>
                        <div className="flex justify-between text-outline font-semibold">
                          <span>Kalan Tahsil Edilecek:</span>
                          <span className="text-secondary font-bold">0,00 ₺</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-lowest space-y-1.5">
                      <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">RESEPSİYON NOTLARI & TALEPLER</span>
                      <div className="p-2 bg-surface-container-low text-body-sm text-on-surface font-body-sm">
                        <p className="leading-relaxed">“Misafir üst kat ve sessiz oda talep etti. Yastık menüsünden ortopedik ve kaz tüyü seçildi. Çıkış günü saat 12:00'ye kadar geç çıkış (late check-out) opsiyonu için ön büroya bilgi verilecek.”</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-high space-y-space-xs mt-auto shadow-sm">
                    <div className="grid grid-cols-2 gap-space-xs">
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="receipt_long" className="text-[16px]" />
                        <span>Folyo İncele</span>
                      </button>
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="swap_horiz" className="text-[16px]" />
                        <span>Oda Değiştir (Upgrade)</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-space-xs">
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="edit_note" className="text-[16px]" />
                        <span>Ön Büro Notu Ekle</span>
                      </button>
                      <button className="h-8 bg-surface-container-lowest text-primary hover:bg-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1 shadow-sm transition-colors" type="button">
                        <Icon name="credit_card" className="text-[16px]" />
                        <span>Oda Kartı Kopyala</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-space-xs pt-1">
                      <button className="flex-1 h-9 bg-secondary text-on-secondary hover:bg-secondary/90 font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors" type="button">
                        <Icon name="logout" className="text-[18px]" />
                        <span>Hızlı Check-out / Çıkış Al</span>
                      </button>
                      <button className="h-9 px-3 bg-surface-container-lowest text-error hover:bg-error-container hover:text-on-error-container font-label-sm text-label-sm flex items-center justify-center shadow-sm transition-colors" title="İptal veya No-Show" type="button">
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
