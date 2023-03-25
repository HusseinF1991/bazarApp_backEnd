const resources = {
  INVOICE_STATUS: {
    DELIVERED: "delivered",
    REJECTED: "rejected",
    APPROVED: "approved",
    PENDING: "pending",
  },
  CHAT: {
    CUSTOMER_SENDER: "customer",
    MANAGER_SENDER: "manager",
    SOCKET_MESSAGE: {
      SEND_MESSAGE:"SEND_MESSAGE",
      RECEIVE_MESSAGE_BY_CUSTOMER: "RECEIVE_MESSAGE_BY_CUSTOMER",
      RECEIVE_MESSAGE_BY_MANAGER: "RECEIVE_MESSAGE_BY_MANAGER"
    },
  },
  JWT: {
    SECRET: "BazarAppBazarAppBazarApp",
  },
  ERRORS: {
    USER_NOT_AUTHORIZED: {
      ERROR: true,
      ERROR_TYPE: "USER_NOT_AUTHORIZED",
    },
  },
  PAYMENT_METHOD: {
    ZAIN_CASH: "ZAIN_CASH",
    CASH: "CASH",
  },
  SHOP_NOTIFICATION: {
    NEW_REQUEST: {
      OP_TITLE: "NEW_REQUEST",
      OP_DESCRIPTION: "تم استلام طلب شراء جديد",
      OP_COL_NAME: "id",
    },
    UPDATE_REQUEST: {},
    DELETE_REQUEST: {},
    NEW_REVIEW: {
      OP_TITLE: "NEW_REVIEW",
      OP_DESCRIPTION: "قام احدهم بتقييم المنتج الخاص بك",
      OP_COL_NAME: "itemId",
    },
    NEW_CHAT_MESSAGE: {
      OP_TITLE: "NEW_CHAT_MESSAGE",
      OP_DESCRIPTION: "تم استلام رسالة جديدة",
      OP_COL_NAME: "invoiceShopId",
    },
  },
  CUSTOMER_NOTIFICATION: {
    INVOICE_MODIFIED: {
      NOTIFY_TITLE: "INVOICE_MODIFIED",
      NOTIFY_BODY1: "Order number ",
      NOTIFY_BODY2: " from shop ",
      NOTIFY_BODY3: " has been modified",
    },
    INVOICE_REJECTED: {
      NOTIFY_TITLE: "INVOICE_REJECTED",
      NOTIFY_BODY1: "Order number ",
      NOTIFY_BODY2: " from shop ",
      NOTIFY_BODY3: " has been rejected",
    },
    INVOICE_DELIVERED: {
      NOTIFY_TITLE: "INVOICE_DELIVERED",
      NOTIFY_BODY1: "Order number ",
      NOTIFY_BODY2: " from shop ",
      NOTIFY_BODY3: " has been delivered",
    },
    NEW_CHAT_MESSAGE: {
      NOTIFY_TITLE: "NEW_CHAT_MESSAGE",
      NOTIFY_BODY1: "New message received to order ",
      NOTIFY_BODY2: " from shop ",
    },
  },
  FIREBASE_SEVER_KEY:
    "FIREBASE_SEVER_KEY",
};

module.exports = resources;
