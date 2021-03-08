<template>
	<div>
		<ion-grid v-for="(item, index) in data" :key="index">
			<ion-row class="first-row">
				<div class="company">
					{{ item.company }}
					<br />
					<span class="model">
						{{ item.model }}
					</span>
				</div>
				<img :src="item.image" />
			</ion-row>
			<ion-row class="second-row">
				<ion-col>
					<div class="label">Leasing Rate</div>
					<div class="value">
						{{ item.rate }}
						<span class="unit">
							/month
						</span>
					</div>
				</ion-col>
				<ion-col>
					<div class="label">Leasing Term</div>
					<div class="value">
						{{ item.term }} 
						<span class="unit">
							months
						</span>
					</div>
				</ion-col>
				<ion-col>
					<div class="label">New</div>
					<div class="value">
						{{ item.new }}
					</div>
				</ion-col>
			</ion-row>
		</ion-grid>
	</div>
</template>

<script>
import { IonGrid, IonRow, IonCol } from "@ionic/vue";

export default {
	name: "card-wallet",
	components: { IonGrid, IonRow, IonCol },
  props: {
		data: {
			type: Array,
			required: true,
			default: () => []
		}
	}
}
</script>

