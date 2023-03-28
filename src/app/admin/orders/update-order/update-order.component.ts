import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {

  orderForm : FormGroup;
  orderId : number;

  constructor(
      private _fb : FormBuilder, 
      private _orderService : OrderService, 
      private _router : Router,
      private _activatedRoute : ActivatedRoute
    ) {
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
      this.orderId= parseInt(this._activatedRoute.snapshot.params['id']);
  }

  ngOnInit() : void {
    this._orderService.getById(this.orderId).subscribe({
     
      next : (res) => {
        this.orderForm.patchValue({
          status : res.result.status,
          delivery_street : res.result.delivery_street,
          delivery_number : res.result.delivery_number,
          delivery_city : res.result.delivery_city,
          delivery_postalCode : res.result.delivery_postalCode,
          delivery_country : res.result.delivery_country,
          payment_method : res.result.payment_method,
          payment_status : res.result.payment_status
        })
      },

      error : (err) => {
        console.log('err', err);
        if (err.status === 404) {
          this._router.navigateByUrl('/not-found')
        }
      }
    })
  }

  updateOrder() : void {
    if (this.orderForm.valid) {
      this._orderService.update(this.orderId, this.orderForm.value).subscribe({
        complete : () => {
          this._router.navigateByUrl('/admin/order')
        }
      })
    }
    else {
      this.orderForm.markAllAsTouched();
    }
  } 
}
