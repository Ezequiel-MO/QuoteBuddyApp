# Payment Service Documentation

## Overview

The Payment Service module encapsulates the API interactions related to payment operations related with Vendor Invoices. It provides dedicated functions for creating and updating payments as well as updating payment PDF data. This separation of API logic from UI and hook logic promotes reusability, easier testing, and a cleaner separation of concerns.

## File Location

- **Path:** `src/services/paymentService.ts`

## Exposed Functions

### 1. `createPayment`

**Purpose:**  
Creates a new payment using the provided data.

**Signature:**

```typescript
createPayment(dataPost: FormData): Promise<IPayment>
```

### 2. `updatePayment`

**Purpose:**  
Updates an existing payment using the provided data.

**Signature:**

```typescript
updatePayment(paymentId: string, dataUpdate: any): Promise<IPayment>
```

### 3. `updatePaymentPdf`

**Purpose:**  
Updates the PDF data associated with an existing payment.

**Signature:**

```typescript
updatePaymentPdf(paymentId: string, valuesUpdatePdf: FormData): Promise<IPayment>
```

## Error Handling:

These functions assume that error handling (e.g., using try/catch blocks) is managed by the calling code (typically within custom hooks or context functions). Make sure to handle errors appropriately when using these functions.
