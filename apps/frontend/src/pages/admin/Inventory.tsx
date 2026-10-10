import Icon from '../../components/Icon'

export default function Inventory() {
  return (
    <>
            <div className="flex flex-col w-full pb-12">
              <div className="w-full bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <span>Envanter & Operasyon</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                      <span className="text-secondary font-semibold">Oda Yönetimi</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                      <span>4 Kat / 77 Oda Matrisi</span>
                    </div>
                    <div className="flex items-center gap-space-sm mt-0.5">
                      <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Oda Envanter Kontrolü</h1>
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-mono-data text-[11px] font-bold">CANLI OPERASYON</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <div className="flex items-center bg-surface-container-low p-1 gap-1">
                      <button className="px-2.5 py-1 text-on-surface bg-surface-container-lowest shadow-sm font-label-sm text-label-sm font-semibold transition-colors" type="button">Tüm Katlar (4)</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">4. Kat</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">3. Kat</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">2. Kat</button>
                      <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">1. Kat</button>
                    </div>
                    <div className="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>
                    <div className="flex items-center bg-surface-container-low p-1 gap-1">
                      <button className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-on-secondary font-label-sm text-label-sm shadow-sm transition-all" type="button">
                        <Icon name="grid_view" className="text-[16px]" />
                        <span>Oda Matrisi</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1 text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm transition-all" type="button">
                        <Icon name="view_agenda" className="text-[16px]" />
                        <span>Tablo Listesi</span>
                      </button>
                    </div>
                    <button className="px-3 py-1.5 bg-primary-container text-surface-container-lowest hover:bg-primary font-label-sm text-label-sm font-medium flex items-center gap-1.5 shadow-sm transition-colors" type="button">
                      <Icon name="published_with_changes" className="text-[16px]" />
                      <span>Toplu Durum Değiştir</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm pt-2">
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Toplam Oda</span>
                      <Icon name="apartment" className="text-outline text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-mono-data">77</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">4 Kat Blok</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-primary h-1" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Dolu Odalar</span>
                      <Icon name="hotel" className="text-secondary text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-secondary font-mono-data">62</span>
                      <span className="font-mono-data text-label-sm font-bold text-secondary">%80.5 Doluluk</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-secondary h-1" style={{width: "80.5%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Müsait & Temiz</span>
                      <Icon name="verified" className="text-on-secondary-container text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-secondary-container font-mono-data">9</span>
                      <span className="font-body-sm text-body-sm text-on-secondary-container font-medium">Satışa Hazır</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-on-secondary-container h-1" style={{width: "11.7%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Temizlik Bekliyor</span>
                      <Icon name="cleaning_services" className="text-on-tertiary-container text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-tertiary-container font-mono-data">4</span>
                      <span className="font-body-sm text-body-sm text-on-tertiary-container font-medium">Kat Hizmetleri</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-on-tertiary-container h-1" style={{width: "5.2%"}}></div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low flex flex-col justify-between col-span-2 md:col-span-1">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">Bakım / Arızalı</span>
                      <Icon name="build" className="text-error text-[18px]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-error font-mono-data">2</span>
                      <span className="font-body-sm text-body-sm text-error font-medium">Kullanım Dışı</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1 mt-2">
                      <div className="bg-error h-1" style={{width: "2.6%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-surface-container px-space-lg py-2 flex flex-wrap items-center justify-between gap-space-sm mt-3">
                <div className="flex flex-wrap items-center gap-space-md text-on-surface font-body-sm text-body-sm">
                  <span className="font-label-sm text-label-sm uppercase text-outline font-semibold">Lejant:</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary-container"></span> Dolu</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-secondary"></span> Giriş Yapacak</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-surface-container-lowest ring-1 ring-secondary"></span> Müsait & Temiz</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-tertiary-fixed"></span> Kirli / Temizlikte</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-error-container"></span> Arızalı / Bakım</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-on-tertiary-container"></span> Royal / VIP</span>
                </div>
                <div className="flex items-center gap-space-md font-mono-data text-mono-data text-outline">
                  <span className="flex items-center gap-1"><Icon name="balcony" className="text-[14px]" /> Balkonlu (40 Oda)</span>
                  <span className="flex items-center gap-1"><Icon name="kitchen" className="text-[14px]" /> Minibar Dolu (58)</span>
                  <span className="flex items-center gap-1"><Icon name="sync" className="text-[14px]" /> Otomatik Yenileme: 30s</span>
                </div>
              </div>
              <div className="w-full mt-3 flex flex-col xl:flex-row items-start gap-space-md">
                <div className="flex-1 w-full space-y- space-y-4">
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">KAT 04</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">4. Kat • Süit ve Deluxe Kanat</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">17 Oda: 1 Royal Suite, 6 Dört Kişilik, 10 Çift Kişilik Balkonlu</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">14 Dolu</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">2 Müsait</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Temizlik</span>
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
                          <div className="font-label-sm text-label-sm text-on-surface-variant truncate font-semibold mt-0.5">Royal Suite Teras</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span className="flex items-center gap-0.5" title="Balkonlu"><Icon name="balcony" className="text-[13px] text-secondary" /> Akdeniz</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5" title="4 Kişilik"><Icon name="group" className="text-[13px]" /> 4</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary font-semibold truncate">M. Weber (VIP)</span>
                            <span className="w-2 h-2 bg-secondary rounded-full" title="Dolu"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span className="text-secondary font-medium">Giriş Yapıldı</span>
                            <span className="text-on-secondary-container">MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">402</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DÖRT KİŞİ</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Aile Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span className="flex items-center gap-0.5">
                              <Icon name="balcony" className="text-[13px] text-secondary" />
                            </span>
                            <span>•</span>
                            <span>4 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Temizlendi (10:45)</span>
                            <span>MB: Kontrol</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">403</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DÖRT KİŞİ</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Aile Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-tertiary-fixed/30 -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-tertiary-fixed-variant font-bold">KİRLİ / SIRADA</span>
                            <span className="w-2 h-2 bg-on-tertiary-container rounded-full animate-pulse"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Çıkış: 11:00</span>
                            <span>Görevli Bekliyor</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">404</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DÖRT KİŞİ</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Aile Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Kişi</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">A. Müller</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu (3. Gece)</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">405</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DÖRT KİŞİ</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Aile Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Kişi</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">C. Dupont</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">406</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">DÖRT KİŞİ</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Aile Deluxe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>4 Kişi</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">J. Smith</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">407</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">H. Demir</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Eksik</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">408</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">R. Novak</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">409</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">K. Lindner</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">410</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">E. Yılmaz</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">411</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Temiz</span>
                            <span>MB: Dolu</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">412</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">P. Bianchi</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">413</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">G. Rossi</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">414</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">N. Varga</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">415</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">B. Kaya</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">416</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">S. Johansson</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">417</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Çift Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">O. Çelik</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">KAT 03</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">3. Kat • Balkonlu Superior Kanat</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Oda: 10 Çift Kişilik Balkonlu (301-310), 10 Üç Kişilik Balkonlu - 1 Çift + 1 Tek (311-320)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">17 Dolu</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">1 Müsait</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Temizlik</span>
                        <span className="text-outline">/</span>
                        <span className="text-error font-bold">1 Arızalı (Oda 312)</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">301</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Kişilik Balkonlu</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">T. Hansen</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">302</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Kişilik Balkonlu</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">D. Kowalski</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">303</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Kişilik Balkonlu</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Temiz</span>
                            <span>MB: Dolu</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">304</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">ÇİFT BALKON</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">2 Kişilik Balkonlu</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="balcony" className="text-[13px] text-secondary" />
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-tertiary-fixed/30 -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-tertiary-fixed-variant font-bold">TEMİZLİK BEKLİYOR</span>
                            <span className="w-2 h-2 bg-on-tertiary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Kat Hizmeti</span>
                            <span>MB: İkmal Gerek</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-error-container/20 p-2.5 flex flex-col justify-between cursor-pointer hover:bg-error-container/30 transition-colors ring-1 ring-error shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-error font-mono-data font-bold">312</span>
                            <span className="px-1.5 py-0.2 bg-error text-on-error text-[10px] font-mono-data font-bold">ARIZALI</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-error font-medium truncate mt-0.5">Üç Kişilik Balkon</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="build" className="text-[13px] text-error" />
                            <span>1 Çift + 1 Tek</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-error text-on-error -mx-2.5 -mb-2.5 p-2 flex flex-col gap-0.5">
                          <div className="flex items-center justify-between font-label-sm text-[11px] font-bold">
                            <span>KLİMA MOTOR ARIZASI</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data opacity-90">
                            <span>Teknik Servis Yolda</span>
                            <span>14:00 Tahmin</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between col-span-2 sm:col-span-1 shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">305 - 311 & 313-320</span>
                            <Icon name="grid_on" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">15 Oda Dolu / Aktif Rezervasyonlar</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>%100 Doluluk</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">Detayı Gör</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">KAT 02</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">2. Kat • Standart ve Twin Kanat</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Oda: 10 Tek Kişilik (201-210), 10 Twin - 2 Tek Yatak (211-220)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">16 Dolu</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">3 Müsait</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Temizlik</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">201</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TEK KİŞİLİK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Tek</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Tek Yatak</span>
                            <span>•</span>
                            <span>1 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">M. Aydın</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">202</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TEK KİŞİLİK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Tek</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Tek Yatak</span>
                            <span>•</span>
                            <span>1 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Hazır</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">211</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 YATAK)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Tek Yatak</span>
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">J. & P. Becker</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">212</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 YATAK)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Tek Yatak</span>
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">L. Moreau</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">213</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TWIN (2 YATAK)</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Standart Twin</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>2 Tek Yatak</span>
                            <span>•</span>
                            <span>2 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Hazır</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">Diğer Odalar (15)</span>
                            <Icon name="summarize" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">14 Dolu, 1 Temizlik Sırasında</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>203-210 & 214-220</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">Listele</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low p-space-sm mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2 py-0.5 bg-primary text-on-primary font-mono-data text-label-sm font-bold">KAT 01</span>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight">1. Kat • Bahçe & Giriş Kanadı</h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">20 Oda: 10 Tek Kişilik (101-110), 10 Üç Kişilik - 3 Tek Yatak (111-120)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md mt-2 sm:mt-0 font-mono-data text-mono-data">
                        <span className="text-secondary font-medium">15 Dolu</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-secondary-container">3 Müsait</span>
                        <span className="text-outline">/</span>
                        <span className="text-on-tertiary-container">1 Temizlik</span>
                        <span className="text-outline">/</span>
                        <span className="text-error font-bold">1 Bakımda (Oda 105)</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">101</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">TEK KİŞİLİK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Bahçe Cephe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>1 Tek Yatak</span>
                            <span>•</span>
                            <span>1 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">A. Yıldırım</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-error-container/20 p-2.5 flex flex-col justify-between cursor-pointer hover:bg-error-container/30 transition-colors ring-1 ring-error shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-error font-mono-data font-bold">105</span>
                            <span className="px-1.5 py-0.2 bg-error text-on-error text-[10px] font-mono-data font-bold">BAKIM</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-error font-medium truncate mt-0.5">Tek Kişilik</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <Icon name="water_damage" className="text-[13px] text-error" />
                            <span>Sıhhi Tesisat</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-error text-on-error -mx-2.5 -mb-2.5 p-2 flex flex-col gap-0.5">
                          <div className="flex items-center justify-between font-label-sm text-[11px] font-bold">
                            <span>BANYO BATARYA DEĞİŞİMİ</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data opacity-90">
                            <span>Bloke Edildi</span>
                            <span>Bugün Tamamlanacak</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">111</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 TEK YATAK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Üç Kişilik Bahçe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Tek Yatak</span>
                            <span>•</span>
                            <span>3 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">K. Demir & Ark.</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Eksik</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">112</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 TEK YATAK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Üç Kişilik Bahçe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Tek Yatak</span>
                            <span>•</span>
                            <span>3 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-on-secondary-container font-semibold">MÜSAİT & TEMİZ</span>
                            <span className="w-2 h-2 bg-on-secondary-container rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Satışa Açık</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2.5 flex flex-col justify-between cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-headline-sm text-headline-sm text-primary font-mono-data font-bold">113</span>
                            <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant text-[10px] font-mono-data">3 TEK YATAK</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline truncate mt-0.5">Üç Kişilik Bahçe</div>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-data text-outline">
                            <span>3 Tek Yatak</span>
                            <span>•</span>
                            <span>3 Kişilik</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 bg-surface-container-low -mx-2.5 -mb-2.5 p-2 flex flex-col gap-1">
                          <div className="flex items-center justify-between font-label-sm text-[11px]">
                            <span className="text-primary truncate">F. Richter</span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono-data text-outline">
                            <span>Dolu</span>
                            <span>MB: Tam</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-2.5 flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm font-semibold text-primary">Kalan 15 Oda</span>
                            <Icon name="format_list_bulleted" className="text-[16px] text-outline" />
                          </div>
                          <p className="font-body-sm text-[11px] text-outline-variant mt-1">102-104, 106-110, 114-120</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono-data text-secondary flex items-center justify-between">
                          <span>13 Dolu / 2 Müsait</span>
                          <span className="px-1.5 py-0.5 bg-surface-container-lowest text-primary">Genişlet</span>
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
                        <div className="font-label-sm text-label-sm uppercase tracking-wider text-outline">SEÇİLİ ODA İNCELEMESİ</div>
                        <h3 className="font-headline-sm text-headline-sm text-primary leading-none mt-0.5">Oda 401 — Royal Suite</h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-on-tertiary-container text-on-tertiary font-mono-data text-[10px] uppercase font-bold tracking-wider">VIP DÜZEYİ</span>
                  </div>
                  <div className="mt-3 relative h-40 w-full overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover" data-alt="Luxurious Aegean panoramic royal penthouse suite in Kemer Antalya with private jacuzzi, floor-to-ceiling glass balcony, elegant Mediterranean marble bathroom, rich teak wood and maritime slate blue textiles in high-end resort lighting" src="/images/img-2.jpg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-space-sm">
                      <div className="text-surface-container-lowest">
                        <span className="font-label-sm text-[10px] tracking-wider uppercase text-secondary-fixed">4. Kat • Teras Süit Bloğu</span>
                        <div className="font-body-lg text-body-lg font-bold">1 King Yatak + Lüks Oturma Grubu</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-2 mt-2 font-mono-data text-[11px]">
                    <div className="flex flex-col">
                      <span className="text-outline uppercase text-[10px]">Kapasite</span>
                      <span className="font-bold text-primary">4 Kişi (Max)</span>
                    </div>
                    <div className="flex flex-col border-x border-outline-variant/30 px-2">
                      <span className="text-outline uppercase text-[10px]">Net Alan</span>
                      <span className="font-bold text-primary">95 m² + 30m²</span>
                    </div>
                    <div className="flex flex-col pl-2">
                      <span className="text-outline uppercase text-[10px]">Manzara</span>
                      <span className="font-bold text-secondary">Panoramik Deniz</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Oda Özellikleri & Donanım</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="mode_fan" className="text-[13px] text-secondary" /> Bağımsız Klima </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="tv" className="text-[13px] text-secondary" /> 65" Smart TV </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="wifi" className="text-[13px] text-secondary" /> Wi-Fi 6 Dedicated </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="hot_tub" className="text-[13px] text-secondary" /> Jakuzi </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="balcony" className="text-[13px] text-secondary" /> Akdeniz Teras </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="kitchen" className="text-[13px] text-secondary" /> Premium Minibar </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="dry" className="text-[13px] text-secondary" /> Fön & Bakım Seti </span>
                      <span className="px-2 py-1 bg-surface-container-low text-on-surface font-body-sm text-[11px] flex items-center gap-1"><Icon name="coffee_maker" className="text-[13px] text-secondary" /> Nespresso Bar </span>
                    </div>
                  </div>
                  <div className="mt-3 bg-surface-container-low p-space-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Aktif Misafir & Rezervasyon</span>
                      <span className="px-1.5 py-0.5 bg-secondary text-on-secondary font-mono-data text-[10px]">REZ #88419</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center font-bold text-xs">MW</div>
                        <div>
                          <div className="font-body-md text-body-md font-bold text-primary">Markus Weber</div>
                          <div className="text-[11px] text-outline font-mono-data">Almanya • 2 Yetişkin, 1 Çocuk</div>
                        </div>
                      </div>
                      <span className="text-right font-mono-data text-[11px]">
                        <span className="text-secondary font-bold block">Her Şey Dahil Ultra</span>
                        <span className="text-outline">24 - 30 Mayıs 2025</span>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-[11px] font-mono-data text-outline">
                      <span>Giriş: 24 Mayıs 14:10</span>
                      <span>Ayrılış: 30 Mayıs 12:00 (6 Gece)</span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Teknik & Temizlik Denetim Kayıtları</span>
                    <div className="p-2 bg-surface-container-low flex items-start justify-between text-body-sm text-body-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="cleaning_services" className="text-secondary text-[16px] mt-0.5" />
                        <div>
                          <div className="text-on-surface font-medium">Son Temizlik & Çarşaf Değişimi</div>
                          <div className="text-[11px] text-outline">Görevli: Fatma Şahin • Şef Onaylı</div>
                        </div>
                      </div>
                      <span className="font-mono-data text-[11px] text-on-secondary-container font-semibold">Bugün 11:20</span>
                    </div>
                    <div className="p-2 bg-surface-container-low flex items-start justify-between text-body-sm text-body-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="check_circle" className="text-on-secondary-container text-[16px] mt-0.5" />
                        <div>
                          <div className="text-on-surface font-medium">Teknik Donanım Durumu</div>
                          <div className="text-[11px] text-outline">Klima, Jakuzi, TV, Kasa: Kusursuz</div>
                        </div>
                      </div>
                      <span className="font-mono-data text-[11px] text-secondary font-semibold">Rapor: OK</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-outline-variant/30 grid grid-cols-2 gap-2">
                    <button className="h-8 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm" type="button">
                      <Icon name="edit" className="text-[15px]" />
                      <span>Durumu Güncelle</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="badge" className="text-[15px]" />
                      <span>Temizlik Ata</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="key" className="text-[15px]" />
                      <span>Oda Kartı Kodla</span>
                    </button>
                    <button className="h-8 bg-surface-container hover:bg-error/10 text-error font-label-sm text-label-sm font-medium flex items-center justify-center gap-1.5 transition-colors" type="button">
                      <Icon name="handyman" className="text-[15px]" />
                      <span>Bakıma Al (Bloke)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
