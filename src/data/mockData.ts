// Mock data for admin components

export const allDisputes = [
  {
    id: "dfa176c4-29b6-4ffb-ad2a-035c00538892",
    bankDetails: {
      bank: "Т-Банк (SBP)",
      phone: "+79815574742",
      owner: "Бодя",
      trader: "obsthandler"
    },
    dealDetails: {
      orderId: "685a5d8e-fc6d-4f32-9c3e-9d6ba64eaee5",
      merchantOrderId: "trip-prod-test-1",
      amountRub: 2007,
      amountCrypto: 25.342829,
      rate: 79.194
    },
    disputeDetails: {
      reason: "WRONG_AMOUNT",
      status: "Открыт",
      amountRubDispute: 2007,
      amountCryptoDispute: 25.342829,
      autoAccept: "Истекло"
    }
  },
  {
    id: "xyz789ab-29b6-4ffb-ad2a-035c00538123",
    bankDetails: {
      bank: "Сбербанк",
      phone: "+79123456789",
      owner: "Иван Иванов",
      trader: "john_trader"
    },
    dealDetails: {
      orderId: "abc123de-fc6d-4f32-9c3e-9d6ba64eef78",
      merchantOrderId: "crypto-test-2",
      amountRub: 5000,
      amountCrypto: 62.5,
      rate: 80.0
    },
    disputeDetails: {
      reason: "PAYMENT_NOT_RECEIVED",
      status: "Заморожен",
      amountRubDispute: 5000,
      amountCryptoDispute: 62.5,
      autoAccept: "2 дня"
    }
  },
  // Add more mock disputes to demonstrate pagination
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `dispute-${i + 3}`,
    bankDetails: {
      bank: i % 2 === 0 ? "Сбербанк" : "Т-Банк",
      phone: `+7912345${String(i).padStart(4, '0')}`,
      owner: `Владелец ${i + 3}`,
      trader: i % 3 === 0 ? "obsthandler" : i % 3 === 1 ? "john_trader" : "mike_trader"
    },
    dealDetails: {
      orderId: `order-${i + 3}`,
      merchantOrderId: `merchant-${i + 3}`,
      amountRub: 1000 + i * 100,
      amountCrypto: 10 + i,
      rate: 80 + i * 0.1
    },
    disputeDetails: {
      reason: i % 2 === 0 ? "WRONG_AMOUNT" : "PAYMENT_NOT_RECEIVED",
      status: i % 3 === 0 ? "Открыт" : i % 3 === 1 ? "Заморожен" : "Закрыт",
      amountRubDispute: 1000 + i * 100,
      amountCryptoDispute: 10 + i,
      autoAccept: i % 2 === 0 ? "Истекло" : `${i} дней`
    }
  }))
];

export const allDeals = [
  {
    id: "0e33...2294",
    bankDetails: {
      bank: "Т-Банк",
      code: "-",
      paymentSystem: "SBP",
      owner: "Магомед Темирбекович",
      requisites: "+79696650172"
    },
    amount: {
      rub: 15042,
      crypto: 178.075056,
      rate: 84.47
    },
    merchant: {
      name: "biwire_finance",
      id: "4558...8109"
    },
    merchantOrderId: "5f8c9774-7023-486b-ad34-2d56a4e10318",
    trader: {
      name: "Lightning's23",
      id: "f506...d788"
    },
    created: {
      utc: "12.09 16:47",
      local: "12.09 19:47"
    },
    updated: {
      utc: "12.09 16:47",
      local: "12.09 19:47"
    },
    timer: "6м 6с",
    status: "PENDING",
    action: "24fc...5e33"
  },
  // Add more mock deals to demonstrate pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `deal-${i + 2}`,
    bankDetails: {
      bank: i % 3 === 0 ? "Т-Банк" : i % 3 === 1 ? "Сбербанк" : "Альфа-Банк",
      code: "-",
      paymentSystem: i % 2 === 0 ? "SBP" : "CARD",
      owner: `Владелец ${i + 2}`,
      requisites: `+7912345${String(i).padStart(4, '0')}`
    },
    amount: {
      rub: 10000 + i * 500,
      crypto: 100 + i * 5,
      rate: 84 + i * 0.1
    },
    merchant: {
      name: i % 2 === 0 ? "biwire_finance" : "crypto_exchange",
      id: `merchant-${i + 2}`
    },
    merchantOrderId: `order-${i + 2}`,
    trader: {
      name: i % 3 === 0 ? "Lightning's23" : i % 3 === 1 ? "Puldorovich" : "john_trader",
      id: `trader-${i + 2}`
    },
    created: {
      utc: "12.09 16:47",
      local: "12.09 19:47"
    },
    updated: {
      utc: "12.09 16:47",
      local: "12.09 19:47"
    },
    timer: `${i + 1}м ${(i * 10) % 60}с`,
    status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "COMPLETED" : "CANCELLED",
    action: `action-${i + 2}`
  }))
];

export const mockTrafficData = [
  {
    id: 1,
    merchant: "merchant_1",
    trader: "trader_1",
    commission: "2.5%",
    reward: "1000₽",
    priority: "high",
    active: true
  },
  {
    id: 2,
    merchant: "merchant_2",
    trader: "trader_2",
    commission: "3.0%",
    reward: "1500₽",
    priority: "medium",
    active: false
  }
];

export const mockBankingDetails = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  bank: i % 3 === 0 ? "Сбербанк" : i % 3 === 1 ? "Т-Банк" : "Альфа-Банк",
  owner: `Владелец ${i + 1}`,
  phone: `+7912345${String(i).padStart(4, '0')}`,
  trader: `trader_${i + 1}`,
  status: i % 2 === 0 ? "Активен" : "Неактивен"
}));