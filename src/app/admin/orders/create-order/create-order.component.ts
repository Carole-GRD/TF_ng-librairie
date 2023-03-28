import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

  orderForm : FormGroup;

  constructor(private _fb : FormBuilder, private _orderService : OrderService, private _router : Router) {
    this.orderForm = this._fb.group({
      status : [null, [Validators.required, Validators.pattern(/^(En attente|Terminée)$/)]],
      delivery_street : [null, Validators.required],
      delivery_number : [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      delivery_city : [null, Validators.required],
      delivery_postalCode : [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      delivery_country : [null, Validators.required],
      payment_method : [null, [Validators.required, Validators.pattern(/^(Visa|Maestro|Payconiq|PayPal)$/)]],
      payment_status : [null, [Validators.required, Validators.pattern(/^(Payé|En attente|Refusé|Annulé)$/)]],
    })
  }

  createOrder() : void {

    if (this.orderForm.valid) {
      this._orderService.create(this.orderForm.value).subscribe({

        next : (res) => {},

        error : (error) => {},

        complete : () => {
          this._router.navigateByUrl('/admin/format');
        }
      })
    }
    else {
      this.orderForm.markAllAsTouched();
    }
  }
}
