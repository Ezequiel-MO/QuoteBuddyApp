# PaymentsContext Documentation

## Overview

The `PaymentsProvider` manages the state related to vendor invoices and payments. It centralizes operations such as creating, updating, and deleting vendor invoices and their related payments.

## State Properties

- `vendorInvoice`: Holds the currently selected vendor invoice. (Type: `Partial<IVendorInvoice> | null`)
- `payment`: Holds the current payment object being created/edited. (Type: `Partial<IPayment> | null`)
- `vendorInvoices`: An array of all vendor invoices fetched from the server. (Type: `IVendorInvoice[]`)
- `update`: A boolean flag indicating if we are in update mode.
- `totalPages`, `page`, etc.: Pagination and filtering related state.

## Reducer Action Types

- `SET_VENDORINVOICES`: Sets the list of vendor invoices.  
  **Payload:** `IVendorInvoice[]`
- `TOGGLE_UPDATE`: Toggles the update mode.  
  **Payload:** `boolean`
- `ADD_PAYMENT`: Adds a new payment object to the context.  
  **Payload:** `IPayment`
- _(Continue for each action type...)_

_(Add additional sections as you document more details.)_
