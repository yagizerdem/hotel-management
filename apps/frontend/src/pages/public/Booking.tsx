import { useState } from 'react'
import Icon from '../../components/Icon'
import { formatTL, useBooking } from '../../context/bookingContext'

const chipBase = 'filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap'

const chipClass = (active: boolean) =>
  active
    ? `${chipBase} bg-primary text-on-primary shadow-sm`
    : `${chipBase} bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors`

export default function Booking() {
  const { filter, selected, setFilter, selectOffer } = useBooking()
  const [updating, setUpdating] = useState(false)
  const [proceeding, setProceeding] = useState(false)

  const subtotal = selected.origPrice * selected.nights
  const total = selected.price * selected.nights
  const discount = subtotal - total
  const discountPct = Math.round((discount / subtotal) * 100)

  const visible = (categories: string) =>
    filter === 'all' || categories.split(' ').includes(filter) ? '' : 'hidden'
  const isSelected = (room: string, board: string) =>
    selected.room === room && selected.board === board

  const refreshAvailability = () => {
    setUpdating(true)
    setTimeout(() => setUpdating(false), 600)
  }

  const proceed = () => {
    setProceeding(true)
    setTimeout(() => {
      alert('Seçiminiz onaylandı! 2. Adım olan Misafir İletişim & Fatura Bilgileri ekranına aktarılıyorsunuz.')
      setProceeding(false)
    }, 700)
  }

  return (
    <div className="theme-public bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(20,39,56,0.06)]">
        <div className="bg-primary text-on-primary">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop h-10 flex items-center justify-between font-label-caps text-label-caps">
            <div className="flex items-center gap-space-md">
              <span className="flex items-center gap-space-xs text-secondary-fixed-dim">
                <Icon name="hotel_class" className="text-[14px]" />
                <span>Akdeniz'in Kalbinde 5 Yıldızlı Ayrıcalık</span>
              </span>
              <span className="hidden sm:inline-block text-outline-variant">|</span>
              <span className="hidden sm:inline-flex items-center gap-space-xs text-inverse-on-surface">
                <Icon name="location_on" className="text-[14px]" />
                <span>Göynük Mahallesi, Kemer / Antalya</span>
              </span>
            </div>
            <div className="flex items-center gap-space-lg">
              <a className="flex items-center gap-space-xs text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="tel:+902428140000">
                <Icon name="phone_in_talk" className="text-[14px]" />
                <span>+90 242 814 88 00</span>
              </a>
              <div className="flex items-center gap-space-xs tracking-wider">
                <a className="text-secondary-fixed font-semibold" href="#">TR</a>
                <span className="text-outline-variant text-[10px]">/</span>
                <a className="text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="#">EN</a>
                <span className="text-outline-variant text-[10px]">/</span>
                <a className="text-inverse-on-surface hover:text-secondary-fixed transition-colors" href="#">RU</a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain" src="/images/img-3.png" />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md tracking-tight text-primary leading-none">BILGE</span>
              <span className="font-label-caps text-[0.625rem] tracking-[0.24em] text-secondary uppercase">Hotel • Resort • Kemer</span>
            </div>
          </div>
          <nav className="hidden xl:flex items-center gap-space-lg font-label-md text-label-md" data-active-classes="text-secondary font-semibold">
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="odalarimiz-suitler" href="#">Odalarımız & Süitler</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="deneyimler-olanaklar" href="#">Deneyimler & Olanaklar</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="restoran-gastronomi" href="#">Restoran & Gastronomi</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="kemer-kesif" href="#">Kemer & Keşif</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="ozel-teklifler" href="#">Özel Teklifler</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-1" data-path="rezervasyonlarim" href="#">Rezervasyonlarım</a>
          </nav>
          <div className="flex items-center gap-space-md shrink-0">
            <a className="hidden sm:inline-flex items-center justify-center px-space-lg py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md shadow-[0_4px_16px_rgba(114,91,56,0.22)] hover:bg-on-secondary-container hover:text-secondary-fixed transition-all" data-path="online-rezervasyon" href="#">Online Rezervasyon Yap</a>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="person" className="text-on-primary text-[18px]" />
            </div>
            <button className="xl:hidden p-2 text-on-surface-variant hover:text-primary" type="button">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <main className="w-full pt-[7.5rem] bg-surface min-h-[calc(100vh-28rem)]">
        <div className="flex flex-col w-full">
          <section className="relative w-full bg-primary-container text-on-primary py-space-xl overflow-hidden shadow-md">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
            </div>
            <div className="relative max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-space-xs text-secondary-fixed mb-space-sm font-label-caps text-label-caps">
                  <Icon name="star" className="text-[15px]" style={{fontVariationSettings: "'FILL' 1"}} />
                  <span>Akdeniz Rivierası • Göynük Koyu • Kemer</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight leading-none mb-space-xs"> Oda Seçimi & Rezervasyon </h1>
                <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed"> Toros Dağları’nın çam esintisi ve Akdeniz'in berrak turkuaz sularında zamansız bir tatil deneyimi. Tercihlerinize en uygun konaklama ayrıcalığını seçin. </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-md self-start md:self-end">
                <div className="flex items-center gap-space-xs bg-primary/70 backdrop-blur-md px-space-md py-2.5 rounded-lg text-secondary-fixed font-label-md text-label-md">
                  <Icon name="verified_user" className="text-[18px]" />
                  <span>Doğrudan Rezervasyon Avantajı</span>
                </div>
                <div className="flex items-center gap-space-xs bg-secondary/30 backdrop-blur-md px-space-md py-2.5 rounded-lg text-surface-bright font-label-md text-label-md">
                  <Icon name="credit_card_off" className="text-[18px]" />
                  <span>Ön Ödemesiz İptal Hakkı</span>
                </div>
              </div>
            </div>
          </section>
          <section className="sticky top-20 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg -mt-4">
            <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md">
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm bg-surface-container-low p-2.5 rounded-xl shadow-sm items-center" id="booking-search-form">
                <div className="lg:col-span-4 bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between gap-space-sm cursor-pointer hover:bg-surface-container transition-colors group">
                  <div className="flex items-center gap-space-sm">
                    <Icon name="calendar_month" className="text-secondary group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline uppercase">Giriş — Çıkış Tarihi</span>
                      <span className="font-title-sm text-title-sm text-primary tracking-tight">24 May 2025 — 29 May 2025</span>
                    </div>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container text-[11px] font-semibold px-2 py-0.5 rounded-full">5 Gece</span>
                </div>
                <div className="lg:col-span-3 bg-surface-container-lowest p-3 rounded-lg flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors group">
                  <Icon name="group" className="text-secondary group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Konuklar</span>
                    <span className="font-title-sm text-title-sm text-primary tracking-tight">2 Yetişkin • 0 Çocuk • 1 Oda</span>
                  </div>
                </div>
                <div className="lg:col-span-3 bg-surface-container-lowest p-3 rounded-lg flex items-center gap-space-sm">
                  <Icon name="restaurant_menu" className="text-secondary" />
                  <div className="flex flex-col w-full">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Pansiyon Tipi</span>
                    <div className="flex items-center gap-space-xs mt-0.5">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input defaultChecked className="accent-secondary h-3.5 w-3.5" name="board_search" type="radio" defaultValue="all_inclusive" />
                        <span className="font-label-md text-body-sm text-on-surface">Her Şey Dahil</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer ml-2">
                        <input className="accent-secondary h-3.5 w-3.5" name="board_search" type="radio" defaultValue="full_board" />
                        <span className="font-label-md text-body-sm text-on-surface">Tam Pansiyon</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <button className="w-full h-[52px] bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed transition-all rounded-lg font-label-md text-label-md shadow-md flex items-center justify-center gap-space-xs" id="update-availability-btn" type="button" onClick={refreshAvailability}><Icon name="autorenew" className={`text-[18px] ${updating ? 'animate-spin' : ''}`} /><span>{updating ? 'Güncelleniyor...' : 'Müsaitlik Güncelle'}</span></button>
                </div>
              </form>
              <div className="mt-space-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="room-category-filters">
                  <button type="button" onClick={() => setFilter('all')} className={chipClass(filter === 'all')}> Tüm Odalar (77 Oda) </button>
                  <button type="button" onClick={() => setFilter('sea_view')} className={chipClass(filter === 'sea_view')}> Balkonlu & Deniz Manzaralı </button>
                  <button type="button" onClick={() => setFilter('family')} className={chipClass(filter === 'family')}> Aile Odaları </button>
                  <button type="button" onClick={() => setFilter('suite')} className={chipClass(filter === 'suite')}> Süit & Royal Penthouse </button>
                </div>
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md shrink-0">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <span className="text-primary font-medium">Seçili tarihlerde 15 oda müsait</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-surface-variant">En İyi Fiyat Garantisi</span>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop mt-space-md">
            <div className="bg-gradient-to-r from-secondary-container/90 via-secondary-container to-secondary-fixed/80 p-space-md md:p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-start md:items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
                  <Icon name="percent" className="text-[26px]" />
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-caps text-label-caps tracking-widest uppercase text-on-secondary-fixed-variant">Erken Rezervasyon Ayrıcalığı</span>
                    <span className="bg-secondary text-on-secondary font-semibold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Yaz 2025</span>
                  </div>
                  <p className="font-body-md text-body-md text-primary font-medium mt-0.5"> En az 1 ay önceden yapılan <span className="font-bold underline decoration-secondary">Her Şey Dahil rezervasyonlarda %18</span>, <span className="font-bold">Tam Pansiyon'da %16</span> doğrudan indirim! Girişe 7 gün kalaya kadar koşulsuz ücretsiz iptal. </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0 font-label-caps text-label-caps text-on-secondary-fixed-variant">
                <Icon name="verified" className="text-[18px]" />
                <span>Resmi Otel Fiyatıdır</span>
              </div>
            </div>
          </section>
          <section className="w-full max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <div className="lg:col-span-8 flex flex-col gap-space-xl" id="room-inventory-container">
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('suite sea_view')}`}>
                  <div className="relative w-full h-[360px] overflow-hidden bg-primary-container">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Ultra-luxury royal penthouse terrace suite at a Mediterranean five star resort overlooking turquoise sea and pine-covered Taurus mountains. High-end modern minimal sun loungers, outdoor Jacuzzi, panoramic glass railing, warm sunset golden hour lighting, muted navy and ivory outdoor linens, architectural sophistication." src="/images/img-4.jpg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30 pointer-events-none"></div>
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-primary/80 backdrop-blur-md text-secondary-fixed px-3 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider flex items-center gap-1 shadow-sm"><Icon name="hotel_class" className="text-[14px]" /> Penthouse Koleksiyonu </span>
                      <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-sm"> %18 Erken Rezervasyon </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-lg font-label-caps text-label-caps text-primary shadow-sm"> 4. Kat • En Üst Kat </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-on-primary">
                      <div>
                        <span className="text-secondary-fixed text-xs tracking-widest uppercase font-label-caps">Özel Rezidans Deneyimi</span>
                        <h2 className="font-headline-lg text-headline-lg text-surface-bright leading-tight drop-shadow-md"> Royal Suite — Akdeniz Terası & Jakuzi </h2>
                      </div>
                      <div className="flex items-center gap-1.5 pb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest/60"></span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col gap-space-md">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container-low p-space-md rounded-lg text-on-surface">
                      <div className="flex items-center gap-2">
                        <Icon name="square_foot" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Alan</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">95 m² + 30 m² Teras</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="group" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Kapasite</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">4 Yetişkin</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="king_bed" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Yatak Tipi</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">1 King + Salon</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="hot_tub" className="text-secondary text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase text-outline font-label-caps">Özellik</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">Özel Teras Jakuzisi</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-space-md text-body-sm font-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> Panoramik Deniz & Toros Dağları Manzarası </span>
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> İtalyan Mermer Banyo & Çift Lavabo </span>
                      <span className="flex items-center gap-1 text-primary"><Icon name="check_circle" className="text-[16px] text-secondary" /> Nespresso Bar & Günlük Premium Minibar </span>
                      <span className="flex items-center gap-1 text-secondary font-medium"><Icon name="flight_takeoff" className="text-[16px]" /> Ücretsiz VIP Havalimanı Transferi </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                      <div className="relative bg-surface p-space-md rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between group/plan">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">Önerilen Paket</span>
                            <h3 className="font-title-sm text-title-sm text-primary">Her Şey Dahil Ultra</h3>
                            <p className="font-body-sm text-body-sm text-outline-variant mt-1">A la Carte restoranlar, seçkin ithal içecekler ve 24 saat oda servisi dahil.</p>
                          </div>
                          <Icon name="all_inclusive" className="text-secondary" />
                        </div>
                        <div className="mt-space-md pt-space-sm flex items-end justify-between">
                          <div>
                            <span className="line-through text-outline font-body-sm text-body-sm">14.500 TL</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-headline-md text-headline-md text-primary font-bold">11.890 TL</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                            </div>
                          </div>
                          <button type="button" onClick={() => selectOffer({ room: "Royal Suite — Akdeniz Terası", board: "Her Şey Dahil Ultra", nights: 5, price: 11890, origPrice: 14500 })} className={`py-2.5 px-4 rounded-lg transition-colors font-label-md text-label-md flex items-center gap-1 shadow-sm ${isSelected("Royal Suite — Akdeniz Terası", "Her Şey Dahil Ultra") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Royal Suite — Akdeniz Terası", "Her Şey Dahil Ultra") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                        </div>
                      </div>
                      <div className="relative bg-surface p-space-md rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between group/plan">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Alternatif Paket</span>
                            <h3 className="font-title-sm text-title-sm text-primary">Tam Pansiyon Plus</h3>
                            <p className="font-body-sm text-body-sm text-outline-variant mt-1">Sabah, öğle ve akşam açık büfe ana restoran gurme menüsü ve sofra içecekleri.</p>
                          </div>
                          <Icon name="restaurant" className="text-outline" />
                        </div>
                        <div className="mt-space-md pt-space-sm flex items-end justify-between">
                          <div>
                            <span className="line-through text-outline font-body-sm text-body-sm">12.200 TL</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-headline-md text-headline-md text-primary font-bold">10.248 TL</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                            </div>
                          </div>
                          <button type="button" onClick={() => selectOffer({ room: "Royal Suite — Akdeniz Terası", board: "Tam Pansiyon Plus", nights: 5, price: 10248, origPrice: 12200 })} className={`px-4 py-2.5 rounded-lg transition-colors font-label-md text-label-md flex items-center gap-1 shadow-sm ${isSelected("Royal Suite — Akdeniz Terası", "Tam Pansiyon Plus") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Royal Suite — Akdeniz Terası", "Tam Pansiyon Plus") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-space-xs font-label-md text-label-md">
                      <button className="text-secondary hover:text-primary transition-colors flex items-center gap-1" type="button">
                        <Icon name="photo_library" className="text-[18px]" />
                        <span>Fotoğraf Galerisi & Kat Planı (9 Fotoğraf)</span>
                      </button>
                      <span className="text-error font-medium text-body-sm flex items-center gap-1"><Icon name="hourglass_top" className="text-[16px]" /> Bu süitten sadece 1 adet bulunmaktadır </span>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('sea_view')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[280px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Modern five star luxury superior double hotel room in Antalya with private balcony overlooking the Mediterranean sea. King size bed dressed in crisp white luxury linens and subtle gold runner, warm natural oak wood accents, beige limestone flooring, afternoon sunlight reflecting off gentle ocean waves." src="/images/img-5.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded font-label-caps text-[0.6875rem] uppercase tracking-wider font-semibold shadow-sm"> En Popüler Seçim </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded">
                        <Icon name="balcony" className="text-[14px]" />
                        <span>3. ve 4. Kat • No: 301-310</span>
                      </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Superior Akdeniz Koleksiyonu</span>
                          <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"><Icon name="alarm" className="text-[13px]" /> Son 3 Oda Kaldı! </span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Çift Kişilik Balkonlu Superior Oda </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 32 m²</span>
                          <span className="flex items-center gap-1"><Icon name="person" className="text-[16px] text-secondary" /> 2 Kişilik</span>
                          <span className="flex items-center gap-1"><Icon name="king_bed" className="text-[16px] text-secondary" /> 1 King Çift Kişilik</span>
                          <span className="flex items-center gap-1"><Icon name="wifi" className="text-[16px] text-secondary" /> Wi-Fi 6 • 55" Smart TV</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Özel Akdeniz ve bahçe manzaralı balkon, mermer banyo, yağmur duşu, minibar ve L'Occitane lüks buklet seti ile donatılmıştır. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Her Şey Dahil</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">%18 İndirim</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">4.250 TL</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">3.485 TL</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                          <span className="text-outline text-[11px]">Vergiler ve servis ücreti dahil</span>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button type="button" onClick={() => selectOffer({ room: "Çift Kişilik Balkonlu Superior Oda", board: "Her Şey Dahil", nights: 5, price: 3485, origPrice: 4250 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm ${isSelected("Çift Kişilik Balkonlu Superior Oda", "Her Şey Dahil") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Çift Kişilik Balkonlu Superior Oda", "Her Şey Dahil") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                          <button type="button" className="text-[12px] text-on-surface-variant hover:text-primary underline text-center transition-colors" onClick={() => selectOffer({ room: "Çift Kişilik Balkonlu Superior Oda", board: "Tam Pansiyon", nights: 5, price: 3024, origPrice: 3600 })}> Tam Pansiyon Seç (3.024 TL) </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('family sea_view')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[280px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Spacious luxury family hotel suite with partitioned bedrooms, master bed and two single beds, wide balcony opening up to green gardens and Mediterranean pine trees. Warm wood furniture, bright airy natural sunlight, tasteful contemporary interior design for high-end resort in Antalya." src="/images/img-6.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md text-on-primary px-2.5 py-1 rounded font-label-caps text-[0.6875rem] uppercase tracking-wider font-semibold shadow-sm"> Aile Konforu </div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 4. Kat • No: 402-407 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Geniş Yaşam Alanı</span>
                          <span className="text-secondary font-label-caps text-[11px] font-semibold">2 Ayrı Yatak Alanı</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Deluxe Aile Odası (Geniş Balkonlu 4 Kişilik) </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 55 m²</span>
                          <span className="flex items-center gap-1"><Icon name="family_restroom" className="text-[16px] text-secondary" /> 4 Kişi Kapasite</span>
                          <span className="flex items-center gap-1"><Icon name="bed" className="text-[16px] text-secondary" /> 1 Çift + 2 Tek Kişilik</span>
                          <span className="flex items-center gap-1"><Icon name="tv" className="text-[16px] text-secondary" /> 2x Smart TV</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Çocuklu aileler için ferah ve konforlu ara kapılı tasarım, geniş Akdeniz manzaralı balkon, çift gardırop ve geniş minibar ikramları. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Her Şey Dahil Aile Paketi</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">%18 İndirim</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">6.800 TL</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">5.576 TL</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                          <span className="text-outline text-[11px]">Bebek yatağı talebi ücretsizdir</span>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Deluxe Aile Odası (4 Kişilik)", board: "Her Şey Dahil", nights: 5, price: 5576, origPrice: 6800 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Deluxe Aile Odası (4 Kişilik)", "Her Şey Dahil") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Deluxe Aile Odası (4 Kişilik)", "Her Şey Dahil") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('all')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[260px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Elegant triple bed boutique resort room in Antalya with warm modern coastal aesthetic. 3 separate comfortable single beds or 1 double and 1 single setup, light stone texture walls, balcony with lush green garden views, soft ivory and navy blue fabric accents, spotless upscale atmosphere." src="/images/img-7.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 1. & 3. Kat • No: 111-120 • 311-320 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest uppercase">Konfor Koleksiyonu</span>
                          <span className="text-outline font-label-caps text-[11px]">Bahçe & Havuz Cepheli</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Üç Kişilik Konfor Oda </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 38 m²</span>
                          <span className="flex items-center gap-1"><Icon name="group" className="text-[16px] text-secondary" /> 3 Kişi</span>
                          <span className="flex items-center gap-1"><Icon name="single_bed" className="text-[16px] text-secondary" /> 3 Ayrı / 1 Çift + 1 Tek Yatak</span>
                          <span className="flex items-center gap-1"><Icon name="ac_unit" className="text-[16px] text-secondary" /> İklimlendirme</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Arkadaş grupları veya 3 kişilik aileler için ideal ergonomi; geniş dolap alanı, çalışma masası ve ferah banyo. </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Her Şey Dahil</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">%18 İndirim</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">5.100 TL</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">4.182 TL</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Üç Kişilik Konfor Oda", board: "Her Şey Dahil", nights: 5, price: 4182, origPrice: 5100 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Üç Kişilik Konfor Oda", "Her Şey Dahil") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Üç Kişilik Konfor Oda", "Her Şey Dahil") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
                <article className={`room-card group bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${visible('all')}`}>
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-5 relative h-[240px] md:h-full bg-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Cozy elegant single hotel bedroom in a Mediterranean luxury resort. Single plush bed with crisp linens, warm wooden work desk, garden view window showing Toros mountain silhouette, calm peaceful atmosphere, clean minimalist interior design." src="/images/img-8.jpg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-3 text-on-primary font-label-caps text-label-caps bg-primary/60 backdrop-blur-md px-2.5 py-1 rounded"> 1. ve 2. Kat • No: 101-110 • 201-210 </div>
                    </div>
                    <div className="md:col-span-7 p-space-lg flex flex-col justify-between gap-space-md">
                      <div>
                        <div className="flex items-center justify-between gap-space-sm mb-1">
                          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Bireysel Kaçış • Solo Seyahat</span>
                          <span className="text-outline font-label-caps text-[11px]">Toros / Bahçe Cepheli</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary mb-2"> Standart Tek Kişilik Oda (Single Room) </h2>
                        <div className="flex flex-wrap items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant mb-space-md bg-surface-container-low p-2 rounded-lg">
                          <span className="flex items-center gap-1"><Icon name="square_foot" className="text-[16px] text-secondary" /> 22 m²</span>
                          <span className="flex items-center gap-1"><Icon name="person" className="text-[16px] text-secondary" /> 1 Kişi</span>
                          <span className="flex items-center gap-1"><Icon name="single_bed" className="text-[16px] text-secondary" /> Rahat Tek Kişilik Yatak</span>
                          <span className="flex items-center gap-1"><Icon name="wifi" className="text-[16px] text-secondary" /> Hızlı Wi-Fi</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2"> Yalnız seyahat eden misafirler veya iş amaçlı konaklamalar için sessiz, dingin ve işlevsel yaşam alanı. (Otel kuralı: Minibarsız konsepttir). </p>
                      </div>
                      <div className="bg-surface p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Tam Pansiyon Fırsatı</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.2 rounded">%16 İndirim</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="line-through text-outline font-body-sm text-[0.875rem]">2.400 TL</span>
                            <span className="font-headline-md text-headline-md text-primary font-bold">2.016 TL</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ gece</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => selectOffer({ room: "Standart Tek Kişilik Oda", board: "Tam Pansiyon", nights: 5, price: 2016, origPrice: 2400 })} className={`px-5 py-2.5 rounded-lg transition-all font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm shrink-0 ${isSelected("Standart Tek Kişilik Oda", "Tam Pansiyon") ? 'bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed' : 'bg-primary-container text-on-primary hover:bg-primary'}`}>{isSelected("Standart Tek Kişilik Oda", "Tam Pansiyon") ? (<><Icon name="check" className="text-[18px]" /><span>Seçildi</span></>) : (<><span>Odayı Seç</span><Icon name="arrow_forward" className="text-[16px]" /></>)}</button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <aside className="lg:col-span-4 sticky top-44 z-30 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-space-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="shopping_bag" className="text-secondary text-[24px]" />
                      <h3 className="font-headline-md text-headline-md text-primary">Seçim Özeti</h3>
                    </div>
                    <span className="bg-secondary/15 text-secondary text-label-caps font-label-caps px-2 py-0.5 rounded font-bold uppercase">1. Adım / 3</span>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
                    <span className="font-label-caps text-label-caps text-outline uppercase">Seçilen Oda</span>
                    <span className="font-title-sm text-title-sm text-primary font-bold" id="summary-room-title">{selected.room}</span>
                    <div className="flex items-center justify-between text-body-sm text-on-surface-variant mt-1">
                      <span className="flex items-center gap-1 text-[13px]"><Icon name="balcony" className="text-[15px] text-secondary" /> Akdeniz Cepheli • 32 m² </span>
                      <span className="bg-secondary-fixed-dim text-on-secondary-fixed-variant text-[11px] font-semibold px-2 py-0.5 rounded" id="summary-board-tag">{selected.board}</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 font-body-sm text-body-sm text-on-surface">
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="calendar_today" className="text-[16px]" /> Tarihler: </span>
                      <span className="font-medium text-primary">24 May – 29 May 2025 ({selected.nights} Gece)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="person" className="text-[16px]" /> Konuklar: </span>
                      <span className="font-medium text-primary">2 Yetişkin, 0 Çocuk</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-outline flex items-center gap-1.5"><Icon name="schedule" className="text-[16px]" /> Giriş / Çıkış: </span>
                      <span className="font-medium text-primary">14:00 / 10:00</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] text-secondary">
                      <span className="flex items-center gap-1.5"><Icon name="cancel" className="text-[16px]" /> İptal Koşulu: </span>
                      <span className="font-medium">17 Mayıs'a kadar Ücretsiz</span>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg text-body-sm text-[13px] text-on-surface-variant space-y-1">
                    <span className="font-label-caps text-label-caps text-primary font-semibold block uppercase">Pakete Dahil Hizmetler:</span>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Açık büfe sabah, öğle, akşam gurme büfeler</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Yerli ve yabancı seçkin içecek servisi & Snack barlar</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check" className="text-[14px] text-secondary" />
                      <span>Özel plaj kabanaları, şezlong & havlu kullanımı</span>
                    </div>
                  </div>
                  <div className="pt-space-sm space-y-2 font-body-sm text-body-sm">
                    <div className="flex items-center justify-between text-outline">
                      <span>Standart Tutar ({selected.nights} Gece x {formatTL(selected.origPrice)} TL):</span>
                      <span className="font-medium" id="summary-subtotal">{formatTL(subtotal)} TL</span>
                    </div>
                    <div className="flex items-center justify-between text-secondary font-medium">
                      <span className="flex items-center gap-1"><Icon name="high_res" className="text-[15px]" /> Erken Rezervasyon İndirimi (%{discountPct}): </span>
                      <span id="summary-discount">-{formatTL(discount)} TL</span>
                    </div>
                    <div className="flex items-center justify-between text-outline text-[12px]">
                      <span>KDV (%10) ve Konaklama Vergisi (%2):</span>
                      <span className="text-on-surface-variant">Dahil</span>
                    </div>
                    <div className="pt-space-xs flex items-baseline justify-between">
                      <div>
                        <span className="font-title-sm text-title-sm text-primary font-bold block">Toplam Tutar</span>
                        <span className="text-outline text-[11px]">(Gecelik <span id="summary-nightly-rate">{formatTL(selected.price)}</span> TL)</span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-lg text-headline-lg text-primary font-bold leading-none" id="summary-total-price">{formatTL(total)} TL</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-xs">
                    <button className="w-full py-3.5 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container hover:text-secondary-fixed transition-all font-label-md text-label-md font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-space-xs group" id="proceed-booking-btn" type="button" onClick={proceed}>{proceeding ? (<><Icon name="sync" className="animate-spin text-[20px]" /><span>Bilgiler Doğrulanıyor...</span></>) : (<><span>Rezervasyonu Tamamla</span><Icon name="arrow_forward" className="text-[20px] group-hover:translate-x-1 transition-transform" /></>)}</button>
                    <span className="text-center block text-[11px] text-outline mt-2"> Kredi kartınızdan hemen çekim yapılmaz • Resepsiyon güvencesi </span>
                  </div>
                  <div className="pt-space-xs flex items-center justify-around text-outline text-[11px] font-label-caps">
                    <div className="flex items-center gap-1">
                      <Icon name="lock" className="text-[16px] text-secondary" />
                      <span>256-Bit SSL</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="security" className="text-[16px] text-secondary" />
                      <span>3D Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="verified" className="text-[16px] text-secondary" />
                      <span>Doğrudan Teyit</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                    <Icon name="support_agent" className="text-[20px]" />
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-outline uppercase block">Özel Asistanlık</span>
                    <p className="font-body-sm text-body-sm text-primary font-medium">Özel istek veya grup rezervasyonu mu var?</p>
                    <a className="text-secondary hover:underline font-label-md text-label-md font-bold text-[13px] inline-flex items-center gap-1 mt-0.5" href="tel:+902428148800">
                      <span>+90 242 814 88 00</span>
                      <Icon name="call" className="text-[14px]" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </section>
          <section className="w-full bg-surface-container-low py-space-2xl mt-space-xl">
            <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold">5 Yıldızlı Ayrıcalıklar</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1"> Konaklamanıza Dahil Deneyimler </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md"> Bilge Hotel Resort misafirleri, Kemer’in eşsiz doğasında kesintisiz konfor ve gastronomi şöleni yaşar. </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="beach_access" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Özel Kemer Plajı & İskele</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Mavi Bayraklı kristal berrak deniz, özel güneşlenme locaları ve gün boyu içecek servisi.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="pool" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Açık & Kapalı Havuzlar</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Lagün havuzu, sonsuzluk manzarası ve ısıtmalı kapalı thalasso dinlenme alanı.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="spa" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Türk Hamamı & Spa</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Geleneksel kese-köpük ritüelleri, Fin saunası, buhar odaları ve Uzak Doğu masajları.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="restaurant" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">3 A La Carte Restoran</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Akdeniz Deniz Mahsulleri, İtalyan Trattoria ve geleneksel Türk Ocakbaşı lezzetleri.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <Icon name="toys" className="text-[26px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-primary mb-1">Çocuk Kulübü (Mini Club)</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">4-12 yaş uzman gözetmen eşliğinde yaratıcı atölyeler, çocuk havuzu ve mini disko.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </main>
      <footer className="w-full bg-primary text-inverse-on-surface pt-space-2xl pb-space-lg">
        <div className="max-w-[1360px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-2xl">
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="flex items-center gap-space-sm mb-space-md">
                <img alt="Bilge Resort Logo" className="h-8 w-auto object-contain brightness-0 invert" src="/images/img-3.png" />
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md text-surface-bright leading-none">BILGE</span>
                  <span className="font-label-caps text-[0.625rem] tracking-[0.2em] text-secondary-fixed-dim uppercase">Resort Kemer</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed mb-space-lg max-w-sm">Akdeniz’in turkuaz suları ve Toros Dağları’nın çam kokulu eteklerinde, zamansız lüks ile dingin konforu buluşturan seçkin bir kaçış noktası.</p>
              <div className="flex flex-col gap-space-xs font-label-caps text-label-caps text-secondary-fixed">
                <div className="flex items-center gap-space-xs">
                  <Icon name="schedule" className="text-[16px]" />
                  <span>Giriş: 14:00 • Çıkış: 10:00</span>
                </div>
                <div className="flex items-center gap-space-xs text-outline-variant font-body-sm text-[0.75rem]">
                  <Icon name="verified" className="text-[16px]" />
                  <span>Kültür ve Turizm Bakanlığı Belge No: 14082</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-space-sm font-body-sm text-body-sm">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-xs">Konaklama</h3>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Deluxe Deniz Süiti</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Toros Villa Koleksiyonu</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Aile Süitleri & Rezidans</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Swim-Up Lagün Odaları</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Özel Plaj Kabanaları</a>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-space-sm font-body-sm text-body-sm">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-xs">Ayrıcalıklar</h3>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Olea Fine Dining & Şarap</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Thalasso & Spa Ritüelleri</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Özel Yat Turları & Koylar</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">Ultra Her Şey Dahil Paketi</a>
              <a className="text-outline-variant hover:text-secondary-fixed transition-colors" href="#">VIP Havalimanı Transferi</a>
            </div>
            <div className="lg:col-span-4 flex flex-col">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-space-sm">Özel Riviera Bülteni</h3>
              <p className="font-body-sm text-body-sm text-outline-variant mb-space-md">Erken rezervasyon avantajları ve özel sezon davetlerinden ilk siz haberdar olun.</p>
              <div className="flex items-stretch gap-space-xs mb-space-lg">
                <input className="w-full bg-primary-container px-space-md py-2.5 rounded-lg font-body-sm text-body-sm text-on-primary placeholder:text-outline focus:outline-none" placeholder="E-posta adresiniz" type="email" />
                <button className="px-space-md py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-on-secondary-container hover:text-secondary-fixed transition-all shrink-0" type="button">Katıl</button>
              </div>
              <div className="flex items-center gap-space-lg pt-space-xs">
                <div className="flex items-center gap-space-xs text-secondary-fixed-dim font-label-caps text-[0.6875rem]">
                  <Icon name="military_tech" className="text-[18px]" />
                  <span>Tripadvisor Travelers' Choice 2024</span>
                </div>
                <div className="flex items-center gap-space-xs text-secondary-fixed-dim font-label-caps text-[0.6875rem]">
                  <Icon name="eco" className="text-[18px]" />
                  <span>Green Key Sertifikalı</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-[0.8125rem] text-outline">
            <p>© 2025 Bilge Hotel Resort Kemer. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-secondary-fixed transition-colors" href="#">Gizlilik Politikası</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">KVKK Aydınlatma Metni</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">İptal & İade Koşulları</a>
              <a className="hover:text-secondary-fixed transition-colors" href="#">Sürdürülebilirlik Raporu</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
