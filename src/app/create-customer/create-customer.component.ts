import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Route } from '../../../node_modules/@angular/router';

@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  submitted = false;
  id: number;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        if(this.id) {
          this.customerService.getCustomerById(this.id)
          .subscribe(response => { 
            this.customer.name = response['name'];
            this.customer.age = response['age'];

          }, 
          error => console.log(error));

        }
      });
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

  save() {
    if(this.id) {
      this.customerService.updateCustomer(this.id, this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
      this.customer = new Customer();
    }
    else {
      this.customerService.createCustomer(this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
      this.customer = new Customer();
    }
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
