export const TRANSFER_CONFIGS = {
	meet_greet: {
		entityName: 'Meet & Greet @ Airport',
		entityType: 'transfer' as const,
		entitySubtype: 'meet_greet' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	},
	assistance: {
		entityName: 'On-board Assistance @ Buses',
		entityType: 'transfer' as const,
		entitySubtype: 'assistance' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	},
	transfer_in: {
		entityName: 'Transfer from Airport',
		entityType: 'transfer' as const,
		entitySubtype: 'main' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	},
	transfer_out: {
		entityName: 'Transfer To Airport',
		entityType: 'transfer' as const,
		entitySubtype: 'transfer_out' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	},
	dispatch: {
		entityName: 'Bus Dispatcher',
		entityType: 'transfer' as const,
		entitySubtype: 'dispatch' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	},
	assistance_out: {
		entityName: 'On-board Assistance',
		entityType: 'transfer' as const,
		entitySubtype: 'assistance_out' as const,
		colors: {
			border: 'green',
			icon: 'green'
		}
	}
} as const
