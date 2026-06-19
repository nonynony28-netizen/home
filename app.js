// State Management
let currentCategory = 'all';
let currentFilter = 'all'; // all, popular, chef
let searchQuery = '';
let cart = [];
let checkoutType = 'dinein'; // dinein, delivery
const WHATSAPP_PHONE = '218910000000'; // Default restaurant WhatsApp number

// DOM Elements
const loader = document.getElementById('loader');
const menuGrid = document.getElementById('menu-grid');
const searchInput = document.getElementById('search-input');
const filterBadges = document.querySelectorAll('.filter-badge');
const categoryTabs = document.querySelectorAll('.category-tab');
const mainHeader = document.getElementById('main-header');

// Cart Elements
const cartTriggerBtn = document.getElementById('cart-trigger-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartBadge = document.getElementById('cart-badge');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Order Type Controls
const orderTypeDinein = document.getElementById('order-type-dinein');
const orderTypeDelivery = document.getElementById('order-type-delivery');
const cartDineinDetails = document.getElementById('cart-dinein-details');
const cartDeliveryDetails = document.getElementById('cart-delivery-details');

// Modals
const zoomModal = document.getElementById('zoom-modal');
const zoomCloseBtn = document.getElementById('zoom-close-btn');
const zoomImage = document.getElementById('zoom-image');
const zoomBadge = document.getElementById('zoom-badge');
const zoomCategory = document.getElementById('zoom-category');
const zoomTitle = document.getElementById('zoom-title');
const zoomDesc = document.getElementById('zoom-desc');
const zoomTime = document.getElementById('zoom-time');
const zoomPrice = document.getElementById('zoom-price');
const zoomAddBtn = document.getElementById('zoom-add-btn');

const qrTriggerBtn = document.getElementById('qr-trigger-btn');
const qrModal = document.getElementById('qr-modal');
const qrCloseBtn = document.getElementById('qr-close-btn');
const qrcodeContainer = document.getElementById('qrcode-container');
const qrUrlText = document.getElementById('qr-url-text');

// Forms
const reservationForm = document.getElementById('reservation-form');

// Service Worker & Startup Registration
window.addEventListener('DOMContentLoaded', () => {
  // Hide loader after a brief aesthetic delay
  setTimeout(() => {
    loader.classList.add('opacity-0', 'pointer-events-none');
  }, 1200);

  // Set default dates to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('res-date').value = today;
  document.getElementById('cart-cust-date').value = today;

  // Initialize App
  initCart();
  renderMenu();
  setupQR();
  registerServiceWorker();
  
  // Re-draw lucide icons
  lucide.createIcons();
});

// Register PWA Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('Service Worker registered successfully with scope: ', reg.scope);
      })
      .catch((err) => {
        console.error('Service Worker registration failed: ', err);
      });
  }
}

// Sticky Header Scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mainHeader.classList.add('bg-luxury-black/90', 'backdrop-blur-md', 'border-b', 'border-gold-500/10', 'py-3');
    mainHeader.classList.remove('py-4');
  } else {
    mainHeader.classList.remove('bg-luxury-black/90', 'backdrop-blur-md', 'border-b', 'border-gold-500/10', 'py-3');
    mainHeader.classList.add('py-4');
  }
});

// Setup QR Code Modal
function setupQR() {
  const currentUrl = window.location.href;
  qrUrlText.textContent = currentUrl;
  
  try {
    const qr = qrcode(0, 'M');
    qr.addData(currentUrl);
    qr.make();
    qrcodeContainer.innerHTML = qr.createSvgTag({ scalable: true, cellSize: 4 });
  } catch (err) {
    console.error('Failed to generate QR Code: ', err);
    qrcodeContainer.innerHTML = '<span class="text-stone-500 text-xs">فشل إنشاء الرمز</span>';
  }
}

// Toggle QR Modal
qrTriggerBtn.addEventListener('click', () => {
  qrModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});
qrCloseBtn.addEventListener('click', () => {
  qrModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderMenu();
});

// Tab Category Filters
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.forEach(t => {
      t.classList.remove('bg-gold-500', 'text-black', 'border-gold-500');
      t.classList.add('bg-luxury-charcoal/60', 'text-stone-300', 'border-gold-500/10');
    });
    tab.classList.add('bg-gold-500', 'text-black', 'border-gold-500');
    tab.classList.remove('bg-luxury-charcoal/60', 'text-stone-300', 'border-gold-500/10');
    currentCategory = tab.dataset.category;
    renderMenu();
  });
});

// Badge Filters (All, Popular, Chef Recommended)
filterBadges.forEach(badge => {
  badge.addEventListener('click', () => {
    filterBadges.forEach(b => {
      b.classList.remove('bg-gold-500', 'text-black', 'border-gold-500');
      b.classList.add('border-gold-500/10', 'bg-luxury-charcoal/40', 'text-stone-300');
    });
    badge.classList.add('bg-gold-500', 'text-black', 'border-gold-500');
    badge.classList.remove('border-gold-500/10', 'bg-luxury-charcoal/40', 'text-stone-300');
    currentFilter = badge.dataset.filter;
    renderMenu();
  });
});

// Mobile Nav Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

mobileMenuBtn.addEventListener('click', () => {
  mobileNavMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});
mobileCloseBtn.addEventListener('click', () => {
  mobileNavMenu.classList.add('hidden');
  document.body.style.overflow = '';
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNavMenu.classList.add('hidden');
    document.body.style.overflow = '';
  });
});

// Render Food Cards
function renderMenu() {
  menuGrid.innerHTML = '';
  
  const filtered = menuData.filter(item => {
    // Category check
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    
    // Filter check (popular/chef)
    let matchesFilter = true;
    if (currentFilter === 'popular') matchesFilter = item.popular;
    if (currentFilter === 'chef') matchesFilter = item.chefRecommended;
    
    // Search query check
    const matchesSearch = item.name.includes(searchQuery) || item.description.includes(searchQuery);
    
    return matchesCategory && matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    menuGrid.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500 flex flex-col items-center justify-center gap-4">
        <i data-lucide="info" class="w-8 h-8 text-gold-500"></i>
        <span>لم نجد أطباقاً تطابق بحثك حالياً.</span>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = "glassmorphism rounded-2xl overflow-hidden group hover:border-gold-500/50 hover:shadow-gold-glow transition-all duration-500 flex flex-col relative";
    
    // Check if we have badges
    let badgeHTML = '';
    if (item.chefRecommended) {
      badgeHTML += `<span class="bg-gold-500 text-black text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">توصية الشيف</span>`;
    } else if (item.popular) {
      badgeHTML += `<span class="bg-stone-850 border border-gold-500/20 text-gold-500 text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">الأكثر طلباً</span>`;
    }

    card.innerHTML = `
      <!-- Dish Image Wrapper -->
      <div class="relative h-56 overflow-hidden cursor-zoom-in" onclick="openZoomModal(${item.id})">
        <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent"></div>
        <div class="absolute top-4 right-4 flex flex-col gap-2">
          ${badgeHTML}
        </div>
        <div class="absolute bottom-4 left-4 p-2 bg-luxury-black/60 backdrop-blur-md rounded-lg flex items-center gap-1 text-[10px] text-stone-300">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-gold-500"></i>
          <span>${item.prepTime}</span>
        </div>
      </div>

      <!-- Dish Details -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex justify-between items-start gap-4">
            <h3 class="font-bold text-lg text-white hover:text-gold-500 transition-colors cursor-zoom-in" onclick="openZoomModal(${item.id})">${item.name}</h3>
            <span class="text-gold-500 font-bold text-lg whitespace-nowrap">${item.price} د.ل</span>
          </div>
          <p class="text-stone-400 text-xs leading-relaxed line-clamp-2">${item.description}</p>
        </div>

        <!-- Order Button Wrapper -->
        <div class="mt-6 pt-4 border-t border-gold-500/10 flex justify-between items-center gap-4">
          <!-- Quantity Adjuster -->
          <div class="flex items-center bg-luxury-black border border-gold-500/25 rounded-full p-1">
            <button onclick="decrementQuantity(${item.id})" class="w-7 h-7 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span id="qty-${item.id}" class="w-8 text-center text-xs font-semibold text-white">1</span>
            <button onclick="incrementQuantity(${item.id})" class="w-7 h-7 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <button onclick="handleAddToCart(${item.id})" class="flex-1 py-2 px-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black text-xs font-bold rounded-full hover:shadow-gold-glow transition-all flex items-center justify-center gap-1.5">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> إضافة
          </button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
  
  lucide.createIcons();
}

// Card Quantity Management (Local state before adding to cart)
const localQuantities = {};
function incrementQuantity(id) {
  localQuantities[id] = (localQuantities[id] || 1) + 1;
  document.getElementById(`qty-${id}`).textContent = localQuantities[id];
}
function decrementQuantity(id) {
  const current = localQuantities[id] || 1;
  if (current > 1) {
    localQuantities[id] = current - 1;
    document.getElementById(`qty-${id}`).textContent = localQuantities[id];
  }
}

// Add Item To Cart
function handleAddToCart(id) {
  const item = menuData.find(m => m.id === id);
  const quantity = localQuantities[id] || 1;
  
  addToCart(item, quantity);
  
  // Reset local quantity display back to 1
  localQuantities[id] = 1;
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) qtyEl.textContent = 1;

  // Visual success feedback
  showFloatingNotification(`تمت إضافة ${item.name} إلى السلة`);
}

// Toast Notifications
function showFloatingNotification(message) {
  const toast = document.createElement('div');
  toast.className = "fixed bottom-8 right-8 z-50 glassmorphism border-gold-500/40 text-gold-500 px-6 py-3.5 rounded-xl shadow-gold-glow flex items-center gap-2 transform translate-y-20 opacity-0 transition-all duration-300 text-sm";
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  lucide.createIcons();
  
  // Slide up and fade in
  setTimeout(() => {
    toast.classList.remove('translate-y-20', 'opacity-0');
  }, 100);

  // Fade out and remove
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Cart Management Logic
function addToCart(item, quantity) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      ...item,
      quantity: quantity,
      notes: ''
    });
  }
  updateCart();
}

function updateCartItemQty(id, change) {
  const item = cart.find(c => c.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  updateCart();
}

function updateCartItemNotes(id, text) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.notes = text;
  }
  // Store state but no need for full render to prevent losing input focus
  saveCartToLocalStorage();
}

function removeCartItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function saveCartToLocalStorage() {
  localStorage.setItem('shawaa_cart', JSON.stringify(cart));
}

function initCart() {
  const stored = localStorage.getItem('shawaa_cart');
  if (stored) {
    try {
      cart = JSON.parse(stored);
      updateCart();
    } catch (e) {
      cart = [];
    }
  }
}

function updateCart() {
  saveCartToLocalStorage();
  renderCart();
}

function renderCart() {
  // Update badges
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalCount;

  // Clear container
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="h-64 flex flex-col items-center justify-center text-stone-500 gap-4">
        <i data-lucide="shopping-bag" class="w-10 h-10 text-stone-700"></i>
        <span class="text-sm">سلتك فارغة حالياً</span>
      </div>
    `;
    cartSubtotal.textContent = '0 د.ل';
    cartTax.textContent = '0 د.ل';
    cartTotal.textContent = '0 د.ل';
    lucide.createIcons();
    return;
  }

  let subtotalVal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotalVal += itemTotal;

    const row = document.createElement('div');
    row.className = "glassmorphism rounded-xl p-4 space-y-3 relative border-gold-500/10";
    row.innerHTML = `
      <div class="flex gap-4">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start">
            <h4 class="font-bold text-sm text-white truncate">${item.name}</h4>
            <span class="text-xs text-gold-500 font-bold">${itemTotal} د.ل</span>
          </div>
          <span class="text-[10px] text-stone-500">${item.price} د.ل للوحدة</span>
          
          <div class="flex justify-between items-center mt-3">
            <!-- Quantity Adjuster -->
            <div class="flex items-center bg-luxury-black border border-gold-500/20 rounded-full p-0.5">
              <button onclick="updateCartItemQty(${item.id}, -1)" class="w-6 h-6 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
                <i data-lucide="minus" class="w-3 h-3"></i>
              </button>
              <span class="w-6 text-center text-xs font-semibold text-white">${item.quantity}</span>
              <button onclick="updateCartItemQty(${item.id}, 1)" class="w-6 h-6 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
                <i data-lucide="plus" class="w-3 h-3"></i>
              </button>
            </div>
            
            <button onclick="removeCartItem(${item.id})" class="text-stone-500 hover:text-red-400 transition-colors" title="إزالة">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Notes input per item -->
      <div>
        <input type="text" placeholder="إضافة ملاحظة للطبق (بدون طماطم، إستواء متوسط...)" 
               oninput="updateCartItemNotes(${item.id}, this.value)" 
               value="${item.notes || ''}" 
               class="w-full bg-luxury-black/60 border border-gold-500/10 rounded-lg px-3 py-1.5 text-[11px] text-stone-300 placeholder-stone-700 focus:outline-none focus:border-gold-500 transition-colors">
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  const taxVal = Math.round(subtotalVal * 0.15);
  const totalVal = subtotalVal + taxVal;

  cartSubtotal.textContent = `${subtotalVal} د.ل`;
  cartTax.textContent = `${taxVal} د.ل`;
  cartTotal.textContent = `${totalVal} د.ل`;

  lucide.createIcons();
}

// Cart Drawer Open/Close Transitions
cartTriggerBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    cartDrawer.classList.remove('-translate-x-full');
  }, 10);
});

cartCloseBtn.addEventListener('click', closeCartDrawer);

function closeCartDrawer() {
  cartDrawer.classList.add('-translate-x-full');
  document.body.style.overflow = '';
  setTimeout(() => {
    cartDrawer.classList.add('hidden');
  }, 500);
}

// Order Type Selection (Dine In / Delivery)
orderTypeDinein.addEventListener('click', () => {
  checkoutType = 'dinein';
  orderTypeDinein.className = "py-2 text-xs font-bold rounded-md bg-gold-500 text-black transition-all";
  orderTypeDelivery.className = "py-2 text-xs font-bold text-stone-400 rounded-md transition-all";
  cartDineinDetails.classList.remove('hidden');
  cartDeliveryDetails.classList.add('hidden');
});

orderTypeDelivery.addEventListener('click', () => {
  checkoutType = 'delivery';
  orderTypeDelivery.className = "py-2 text-xs font-bold rounded-md bg-gold-500 text-black transition-all";
  orderTypeDinein.className = "py-2 text-xs font-bold text-stone-400 rounded-md transition-all";
  cartDeliveryDetails.classList.remove('hidden');
  cartDineinDetails.classList.add('hidden');
});

// Open Zoom Modal
let currentZoomedId = null;
function openZoomModal(id) {
  const item = menuData.find(m => m.id === id);
  if (!item) return;
  
  currentZoomedId = id;
  zoomImage.src = item.image;
  zoomCategory.textContent = item.category === 'appetizers' ? 'المقبلات' :
                             item.category === 'salads' ? 'السلطات' :
                             item.category === 'mains' ? 'الأطباق الرئيسية' :
                             item.category === 'grills' ? 'المشويات' :
                             item.category === 'seafood' ? 'المأكولات البحرية' :
                             item.category === 'pizza' ? 'البيتزا' :
                             item.category === 'burgers' ? 'البرجر' :
                             item.category === 'desserts' ? 'الحلويات' :
                             item.category === 'hot_drinks' ? 'المشروبات الساخنة' : 'المشروبات الباردة';
  
  zoomTitle.textContent = item.name;
  zoomDesc.textContent = item.description;
  zoomTime.textContent = item.prepTime;
  zoomPrice.textContent = `${item.price} د.ل`;
  
  if (item.chefRecommended) {
    zoomBadge.classList.remove('hidden');
  } else {
    zoomBadge.classList.add('hidden');
  }
  
  zoomModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close Zoom Modal
zoomCloseBtn.addEventListener('click', () => {
  zoomModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Zoom modal Add to Cart button
zoomAddBtn.addEventListener('click', () => {
  if (currentZoomedId) {
    handleAddToCart(currentZoomedId);
    zoomModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Checkout / WhatsApp Order Confirmation
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  let name = '';
  let phone = '';
  let date = '';
  let time = '';
  let guests = '';
  let address = '';

  if (checkoutType === 'dinein') {
    name = document.getElementById('cart-cust-name').value.trim();
    phone = document.getElementById('cart-cust-phone').value.trim();
    date = document.getElementById('cart-cust-date').value;
    time = document.getElementById('cart-cust-time').value;
    guests = document.getElementById('cart-cust-guests').value;

    if (!name || !phone) {
      alert('يرجى تعبئة الاسم ورقم الجوال لتأكيد الحجز والطاولات.');
      return;
    }
  } else {
    name = document.getElementById('cart-deliv-name').value.trim();
    phone = document.getElementById('cart-deliv-phone').value.trim();
    address = document.getElementById('cart-deliv-address').value.trim();

    if (!name || !phone || !address) {
      alert('يرجى تعبئة الاسم ورقم الجوال وعنوان التوصيل لتأكيد الطلب.');
      return;
    }
  }

  // Compile Order message
  let msg = `مرحباً مطعم بيت الشواء،\n`;
  if (checkoutType === 'dinein') {
    msg += `أرغب بتأكيد الطلب وحجز طاولة لتناول الطعام.\n\n`;
    msg += `الاسم: ${name}\n`;
    msg += `رقم الهاتف: ${phone}\n`;
    msg += `التاريخ: ${date}\n`;
    msg += `الوقت: ${time}\n`;
    msg += `عدد الأشخاص: ${guests}\n\n`;
  } else {
    msg += `أرغب بتأكيد طلب توصيل منزلي.\n\n`;
    msg += `الاسم: ${name}\n`;
    msg += `رقم الهاتف: ${phone}\n`;
    msg += `عنوان التوصيل: ${address}\n\n`;
  }

  msg += `الطلبات:\n`;
  cart.forEach(item => {
    msg += `* ${item.name} × ${item.quantity}`;
    if (item.notes) {
      msg += ` (${item.notes})`;
    }
    msg += `\n`;
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  msg += `\nالمجموع الفرعي: ${subtotal} د.ل\n`;
  msg += `الضريبة (15%): ${tax} د.ل\n`;
  msg += `الإجمالي: ${total} د.ل\n\n`;
  msg += `يرجى تأكيد الاستلام، شكراً لكم.`;

  // Send via WhatsApp URL
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  
  // Clear cart on success
  cart = [];
  updateCart();
  closeCartDrawer();
});

// Full Table Reservation Form Handler
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('res-name').value.trim();
  const phone = document.getElementById('res-phone').value.trim();
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const guests = document.getElementById('res-guests').value;
  const notes = document.getElementById('res-notes').value.trim();

  // Create WhatsApp message
  let msg = `مرحباً مطعم بيت الشواء،\n`;
  msg += `أرغب بطلب حجز طاولة جديدة.\n\n`;
  msg += `الاسم: ${name}\n`;
  msg += `رقم الهاتف: ${phone}\n`;
  msg += `التاريخ: ${date}\n`;
  msg += `الوقت: ${time}\n`;
  msg += `عدد الأشخاص: ${guests}\n`;
  if (notes) {
    msg += `طلبات خاصة: ${notes}\n`;
  }
  msg += `\nيرجى تأكيد الحجز وتوفير الطاولة المناسبة. شكراً لكم.`;

  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  reservationForm.reset();
  showFloatingNotification("تم إرسال طلب الحجز بنجاح عبر الواتساب");
});
