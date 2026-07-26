"use client";

import { useEffect, useState, useRef } from "react";
import { useSession  } from "@/components/AuthProvider";
import { useTenant } from "@/components/TenantProvider";
import { User, Check, X, Gift, Coffee, Bell, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Scanner } from "@yudiel/react-qr-scanner";
import { QRCodeSVG } from "qrcode.react";

type ModalType = "NONE" | "SCAN" | "REDEEM" | "CAMPAIGNS" | "SUCCESS" | "NOTIFICATIONS";

export default function CustomerHome() {
  const { data: session } = useSession();
  const business = useTenant();
  const router = useRouter();
  const [wallet, setWallet] = useState<{ beans: number, rewards: number, foodPoints: number, foodRewards: number } | null>(null);
  const [requiredCoffees, setRequiredCoffees] = useState(10);
  const [requiredFoods, setRequiredFoods] = useState(10);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "default">("default");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [modalType, setModalType] = useState<ModalType>("NONE");
  const [successMessage, setSuccessMessage] = useState("");
  const [redeemToken, setRedeemToken] = useState<string | null>(null);
  const [redeemType, setRedeemType] = useState<"COFFEE" | "FOOD" | null>(null);
  const [activeTab, setActiveTab] = useState<"COFFEE" | "FOOD">("COFFEE");

  // Polling ref
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushPermission(Notification.permission);
      if (Notification.permission === "granted") {
        silentSubscribe();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const silentSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/api/sw.js', { scope: '/' });
      await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();
      
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) return;
      
      const urlB64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };
      
      const subscription = existingSub || await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(vapidKey)
      });
      const subData = subscription.toJSON ? subscription.toJSON() : subscription;
      
      await fetch('/api/customer/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subData)
      });
    } catch (e) {
      console.error("Silent sub failed", e);
    }
  };

  const handleSubscribePush = async () => {
    try {
      setIsSubscribing(true);
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register('/api/sw.js', { scope: '/' });
        await navigator.serviceWorker.ready;
        
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
          alert("Hata: VAPID Key bulunamadı!");
          return;
        }
        
        const urlB64ToUint8Array = (base64String: string) => {
          const padding = '='.repeat((4 - base64String.length % 4) % 4);
          const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
          const rawData = window.atob(base64);
          const outputArray = new Uint8Array(rawData.length);
          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
          }
          return outputArray;
        };
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(vapidKey)
        });
        const subData = subscription.toJSON ? subscription.toJSON() : subscription;
        
        const res = await fetch('/api/customer/push-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subData)
        });
        
        if (res.ok) alert("Bildirimler başarıyla açıldı!");
      }
    } catch (err: any) {
      alert("Bir hata oluştu: " + (err.message || err.toString()));
    } finally {
      setIsSubscribing(false);
    }
  };

  const fetchData = async () => {
    try {
      const [walletRes, announcementsRes] = await Promise.all([
        fetch("/api/customer/wallet"),
        fetch("/api/announcements")
      ]);
      if (walletRes.ok) {
        const data = await walletRes.json();
        setWallet(data.wallet);
        if (data.requiredCoffees) setRequiredCoffees(data.requiredCoffees);
        if (data.requiredFoods) setRequiredFoods(data.requiredFoods);
      }
      if (announcementsRes.ok) {
        const data = await announcementsRes.json();
        const allAnns = data.announcements || [];
        
        let dismissed: string[] = [];
        let readIds: string[] = [];
        if (typeof window !== "undefined") {
          dismissed = JSON.parse(localStorage.getItem("dismissedNotifications") || "[]");
          readIds = JSON.parse(localStorage.getItem("readNotifications") || "[]");
        }
        
        const camps = allAnns.filter((a: any) => !a.isPush);
        const notifs = allAnns.filter((a: any) => a.isPush && !dismissed.includes(a.id));
        
        setCampaigns(camps);
        setNotifications(notifs);
        
        const unread = notifs.filter((n: any) => !readIds.includes(n.id)).length;
        setUnreadCount(unread);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // Modal helpers
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => {
    setModalType("NONE");
    setRedeemToken(null);
    setRedeemType(null);
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setModalType("SUCCESS");
    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  const openNotifications = () => {
    setModalType("NOTIFICATIONS");
    setUnreadCount(0);
    if (typeof window !== "undefined") {
      const readIds = notifications.map(n => n.id);
      localStorage.setItem("readNotifications", JSON.stringify(readIds));
    }
  };

  const dismissNotification = (id: string) => {
    if (typeof window !== "undefined") {
      const dismissed = JSON.parse(localStorage.getItem("dismissedNotifications") || "[]");
      dismissed.push(id);
      localStorage.setItem("dismissedNotifications", JSON.stringify(dismissed));
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  // --- SCAN (QR Okut Kazan) Logic ---
  const handleScan = async (scannedData: string) => {
    setModalType("NONE"); 
    try {
      const res = await fetch("/api/customer/qr/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: scannedData })
      });
      const data = await res.json();
      if (res.ok) {
        setWallet({ 
          beans: data.newBeans, 
          rewards: data.newRewards,
          foodPoints: data.newFoodPoints,
          foodRewards: data.newFoodRewards
        });
        showSuccess(data.message || "Puan Başarıyla Eklendi!");
      } else {
        alert(data.error || "Hata oluştu.");
      }
    } catch (err) {
      alert("Okuma başarısız");
    }
  };

  // --- REDEEM (Ödül Kullan) Logic ---
  const handleOpenRedeem = async (type: "COFFEE" | "FOOD") => {
    if (type === "COFFEE" && (!wallet?.rewards || wallet.rewards < 1)) return;
    if (type === "FOOD" && (!wallet?.foodRewards || wallet.foodRewards < 1)) return;
    
    try {
      const res = await fetch("/api/customer/qr/generate", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: type })
      });
      const data = await res.json();
      if (res.ok) {
        setRedeemToken(data.token);
        setRedeemType(type);
        openModal("REDEEM");
        startPollingForRedeem(type);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Bir hata oluştu");
    }
  };

  const startPollingForRedeem = (type: "COFFEE" | "FOOD") => {
    if (pollInterval.current) clearInterval(pollInterval.current);
    
    pollInterval.current = setInterval(async () => {
      try {
        const res = await fetch("/api/customer/wallet");
        if (res.ok) {
          const data = await res.json();
          setWallet((prev) => {
            if (prev) {
              const currentReward = type === "COFFEE" ? data.wallet.rewards : data.wallet.foodRewards;
              const prevReward = type === "COFFEE" ? prev.rewards : prev.foodRewards;
              
              if (currentReward < prevReward) {
                if (pollInterval.current) clearInterval(pollInterval.current);
                showSuccess("Ödülünüz Başarıyla Kullanıldı! Afiyet Olsun 🎉");
              }
            }
            return data.wallet;
          });
        }
      } catch (err) {}
    }, 3000);
  };

  if (loading) return <div style={{ padding: "3rem", textAlign: "center" }}>Yükleniyor...</div>;

  const currentBeans = wallet?.beans || 0;
  const progressCoffee = Math.min(currentBeans, requiredCoffees);
  const hasRewardCoffee = wallet?.rewards !== undefined && wallet.rewards > 0;

  const currentFood = wallet?.foodPoints || 0;
  const progressFood = Math.min(currentFood, requiredFoods);
  const hasRewardFood = wallet?.foodRewards !== undefined && wallet.foodRewards > 0;

  const renderCoffeeFace = () => (
    <div style={{
      width: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start", padding: "0"
    }}>
      <div style={{ width: "240px", height: "240px", position: "relative", marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image src={business.coffeeMascot || "/kahve.svg"} alt="Kahve" width={240} height={240} style={{ objectFit: "contain" }} priority />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1rem", fontWeight: "bold", color: "var(--text-secondary)" }}>Kahve Çekirdekleri</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary)" }}>{currentBeans} <span style={{fontSize: "1rem", color: "var(--text-secondary)"}}>/ {requiredCoffees}</span></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", alignItems: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "0", right: "0", height: "2px", backgroundColor: "#000", zIndex: 0, transform: "translateY(-50%)" }}></div>
          {Array.from({ length: requiredCoffees }).map((_, i) => {
            const isLast = i === requiredCoffees - 1;
            return (
              <div key={i} style={{ zIndex: 1, backgroundColor: "var(--bg-primary)", padding: "2px" }}>
                {i < progressCoffee ? (
                  <div style={{ width: isLast ? "24px" : "16px", height: isLast ? "24px" : "16px", backgroundColor: isLast ? "var(--primary)" : "#000", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {isLast ? <Gift size={14} color="white" /> : <Check size={10} color="white" strokeWidth={4} />}
                  </div>
                ) : (
                  <div style={{ width: isLast ? "24px" : "16px", height: isLast ? "24px" : "16px", backgroundColor: "white", border: "2px solid #000", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {isLast && <Gift size={14} color="#000" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFoodFace = () => (
    <div style={{
      width: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start", padding: "0"
    }}>
      <div style={{ width: "240px", height: "240px", position: "relative", marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image src={business.foodMascot || "/yemek.svg"} alt="Yemek" width={240} height={240} style={{ objectFit: "contain" }} priority />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1rem", fontWeight: "bold", color: "var(--text-secondary)" }}>Yemek Puanları</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#F59E0B" }}>{currentFood} <span style={{fontSize: "1rem", color: "var(--text-secondary)"}}>/ {requiredFoods}</span></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", alignItems: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "0", right: "0", height: "2px", backgroundColor: "#000", zIndex: 0, transform: "translateY(-50%)" }}></div>
          {Array.from({ length: requiredFoods }).map((_, i) => {
            const isLast = i === requiredFoods - 1;
            return (
              <div key={i} style={{ zIndex: 1, backgroundColor: "var(--bg-primary)", padding: "2px" }}>
                {i < progressFood ? (
                  <div style={{ width: isLast ? "24px" : "16px", height: isLast ? "24px" : "16px", backgroundColor: isLast ? "#F59E0B" : "#000", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {isLast ? <Gift size={14} color="white" /> : <Check size={10} color="white" strokeWidth={4} />}
                  </div>
                ) : (
                  <div style={{ width: isLast ? "24px" : "16px", height: isLast ? "24px" : "16px", backgroundColor: "white", border: "2px solid #000", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {isLast && <Gift size={14} color="#000" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: "100dvh", 
      display: "flex", 
      flexDirection: "column",
      padding: "1.5rem 1rem", 
      backgroundColor: "var(--bg-primary)",
      position: "relative",
      overflowX: "hidden",
      overflowY: "auto"
    }}>
      
      {/* Üst Bar: Logo, Hoşgeldin ve Profil */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div style={{ 
          width: "75px",
          height: "75px",
          position: "relative"
        }}>
          {business.logo && <Image src={business.logo} alt={`${business.name} Logo`} fill style={{ objectFit: "contain" }} priority />}
        </div>

        <h1 className="font-caveat" style={{ 
          fontSize: "1.75rem", 
          textAlign: "center", 
          lineHeight: 1.1, 
          margin: "0",
          color: "var(--text-primary)",
          flex: 1
        }}>
          Hoş Geldin, {session?.user?.name?.split(' ')[0] || session?.user?.name}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div onClick={openNotifications} style={{ position: "relative", cursor: "pointer", color: "var(--text-primary)" }}>
            <Bell size={28} strokeWidth={1.5} />
            {unreadCount > 0 && (
              <div style={{
                position: "absolute", top: "-2px", right: "-2px",
                backgroundColor: "#EF4444", color: "white",
                fontSize: "0.7rem", fontWeight: "bold",
                width: "18px", height: "18px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid var(--bg-primary)"
              }}>
                {unreadCount}
              </div>
            )}
          </div>
          
          <Link href="/dashboard/customer/profile" style={{ color: "var(--text-primary)" }}>
            <User size={28} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* İllüstrasyon ve Butonlar */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

        {/* Toggle Buttons */}
        {business.isFoodEnabled && (
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <button 
              onClick={() => setActiveTab("COFFEE")}
              style={{ 
                width: "60px", height: "60px", borderRadius: "50%", 
                display: "flex", alignItems: "center", justifyContent: "center",
                border: activeTab === "COFFEE" ? "none" : "2px solid var(--primary)",
                backgroundColor: activeTab === "COFFEE" ? "var(--primary)" : "var(--bg-primary)",
                color: activeTab === "COFFEE" ? "white" : "var(--primary)",
                boxShadow: activeTab === "COFFEE" ? "0 0 0 6px rgba(101, 67, 33, 0.15)" : "none",
                cursor: "pointer", transition: "all 0.3s ease"
              }}
            >
              <Coffee size={28} />
            </button>
            
            <button 
              onClick={() => setActiveTab("FOOD")}
              style={{ 
                width: "60px", height: "60px", borderRadius: "50%", 
                display: "flex", alignItems: "center", justifyContent: "center",
                border: activeTab === "FOOD" ? "none" : "2px solid #F59E0B",
                backgroundColor: activeTab === "FOOD" ? "#F59E0B" : "var(--bg-primary)",
                color: activeTab === "FOOD" ? "white" : "#F59E0B",
                boxShadow: activeTab === "FOOD" ? "0 0 0 6px rgba(245, 158, 11, 0.15)" : "none",
                cursor: "pointer", transition: "all 0.3s ease"
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9Z"></path>
                <path d="M3 12h18"></path>
                <path d="M5 16h14"></path>
                <path d="M12 3v9"></path>
                <path d="M7.5 4.5 9 12"></path>
                <path d="M16.5 4.5 15 12"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Mascot ve Puanlar */}
        <div style={{ width: "100%", maxWidth: "300px", margin: "0 auto 2rem auto" }} className="fade-in">
           {activeTab === "COFFEE" ? renderCoffeeFace() : renderFoodFace()}
        </div>

        {/* Butonlar */}
        <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <button 
            className="btn-primary" 
            onClick={() => openModal("SCAN")}
            style={{ 
              padding: "1rem", 
              fontSize: "1.2rem", 
              boxShadow: "0 4px 14px rgba(101, 67, 33, 0.4)",
              lineHeight: 1.2
            }}
          >
            Qr Okut<br/>Kazan
          </button>

          <div style={{ display: "grid", gridTemplateColumns: business.isFoodEnabled ? "1fr 1fr" : "1fr", gap: "1rem" }}>
            
            {/* Kahve Ödül Butonu */}
            <div style={{ position: "relative", width: "100%" }}>
              {hasRewardCoffee && (
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  backgroundColor: "#EF4444", 
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  zIndex: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  animation: "bounce 2s infinite"
                }}>
                  {wallet.rewards}
                </div>
              )}
              <button 
                className="btn-secondary" 
                onClick={() => handleOpenRedeem("COFFEE")}
                style={{ 
                  width: "100%",
                  fontSize: "0.875rem", 
                  padding: "0.875rem 0",
                  opacity: hasRewardCoffee ? 1 : 0.5,
                  cursor: hasRewardCoffee ? "pointer" : "not-allowed",
                  borderColor: "var(--primary)",
                  color: "var(--primary)"
                }}
                disabled={!hasRewardCoffee}
              >
                ☕ Kahve Ödülü
              </button>
            </div>
            
            {/* Yemek Ödül Butonu */}
            {business.isFoodEnabled && (
              <div style={{ position: "relative", width: "100%" }}>
                {hasRewardFood && (
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "#EF4444", 
                    color: "white",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    zIndex: 10,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    animation: "bounce 2s infinite"
                  }}>
                    {wallet.foodRewards}
                  </div>
                )}
                <button 
                  className="btn-secondary" 
                  onClick={() => handleOpenRedeem("FOOD")}
                  style={{ 
                    width: "100%",
                    fontSize: "0.875rem", 
                    padding: "0.875rem 0",
                    opacity: hasRewardFood ? 1 : 0.5,
                    cursor: hasRewardFood ? "pointer" : "not-allowed",
                    borderColor: "#F59E0B",
                    color: "#F59E0B"
                  }}
                  disabled={!hasRewardFood}
                >
                  🍔 Yemek Ödülü
                </button>
              </div>
            )}
            
          </div>
          
          <button 
            className="btn-secondary" 
            onClick={() => openModal("CAMPAIGNS")}
            style={{ fontSize: "0.875rem", padding: "0.875rem 0", width: "100%" }}
          >
            Kampanyalar
          </button>
          
        </div>
      </div>

      {/* MODAL (Pop-up) YAPI */}
      {modalType !== "NONE" && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
          <div className="fade-in" style={{
            width: "calc(100% - 60px)",
            maxWidth: "350px",
            backgroundColor: "white",
            border: "2px solid #000",
            borderRadius: "1.5rem",
            padding: "1.5rem",
            position: "relative",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            
            {modalType !== "SUCCESS" && (
              <button onClick={closeModal} style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#000" />
              </button>
            )}

            {modalType === "SCAN" && (
              <>
                <h2 className="font-caveat" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Barkod Okut</h2>
                <div style={{ width: "100%", borderRadius: "1rem", overflow: "hidden", border: "2px solid var(--primary)" }}>
                  <Scanner onScan={(result) => handleScan(result[0].rawValue)} />
                </div>
                <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                  Kasiyerin gösterdiği kodu taratın.
                </p>
              </>
            )}

            {modalType === "REDEEM" && (
              <>
                <h2 className="font-caveat" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Ödül Kodunuz</h2>
                <div style={{ padding: "1rem", background: "white", borderRadius: "1rem", border: "2px solid var(--primary)" }}>
                  {redeemToken && <QRCodeSVG value={redeemToken} size={150} />}
                </div>
                <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                  Bu kodu kasiyere gösterin.
                </p>
              </>
            )}

            {modalType === "CAMPAIGNS" && (
              <>
                <h2 className="font-caveat" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Kampanyalar</h2>
                {campaigns.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxHeight: "250px", overflowY: "auto" }}>
                    {campaigns.map((ann) => (
                      <div key={ann.id} style={{ padding: "0.75rem", border: "1px solid var(--border-color)", borderRadius: "0.75rem", textAlign: "left" }}>
                        <h3 style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>{ann.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{ann.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Şu an aktif kampanya bulunmuyor.</p>
                )}
              </>
            )}

            {modalType === "NOTIFICATIONS" && (
              <>
                <h2 className="font-caveat" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Bildirimler</h2>
                
                {pushPermission !== "granted" && (
                  <div style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", borderRadius: "1rem", padding: "1rem", marginBottom: "1rem", width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Bell size={18} color="#10B981" />
                      <h3 style={{ margin: 0, fontSize: "0.95rem", color: "#065F46" }}>Bildirimleri Aç</h3>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#047857", opacity: 0.8 }}>Özel fırsatları kaçırmamak için bildirimlere izin verin.</p>
                    <button 
                      onClick={handleSubscribePush}
                      disabled={isSubscribing}
                      style={{ padding: "0.5rem", backgroundColor: "#10B981", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem", marginTop: "0.5rem" }}
                    >
                      {isSubscribing ? "Açılıyor..." : "İzin Ver"}
                    </button>
                  </div>
                )}

                {notifications.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxHeight: "300px", overflowY: "auto" }}>
                    {notifications.map((ann) => (
                      <div key={ann.id} style={{ position: "relative", padding: "0.75rem", paddingRight: "2.5rem", border: "1px solid var(--border-color)", borderRadius: "0.75rem", textAlign: "left" }}>
                        <h3 style={{ fontSize: "0.9rem", marginBottom: "0.25rem", color: "var(--primary)" }}>{ann.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{ann.content}</p>
                        
                        <button 
                          onClick={() => dismissNotification(ann.id)}
                          style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
                        >
                          <Trash2 size={16} color="var(--danger)" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", padding: "1rem" }}>Şu an yeni bildiriminiz bulunmuyor.</p>
                )}
              </>
            )}

            {modalType === "SUCCESS" && (
              <>
                <div style={{
                  width: "60px", height: "60px", borderRadius: "50%",
                  backgroundColor: "var(--success)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem", animation: "fadeIn 0.5s ease-out"
                }}>
                  <Check size={32} color="white" strokeWidth={4} />
                </div>
                <h2 className="font-caveat" style={{ fontSize: "1.8rem", color: "var(--success)", lineHeight: 1.2 }}>
                  {successMessage}
                </h2>
              </>
            )}

          </div>
        </div>
      )}

      {/* Global animasyonlar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}} />
    </div>
  );
}
