import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Observable<Customer[]>;
  @Input() customer: Customer;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteCustomers() {
    this.customerService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData() {
    this.customers = this.customerService.getCustomersList();
  }
  updateActive(isActive: boolean, customer: any) {
    this.customerService.updateCustomer(customer.id,
      { name: customer.name, age: customer.age, active: isActive })
      .subscribe(
        data => {
          console.log(data);
          this.customer = data as Customer;
          this.reloadData();
        },
        error => console.log(error));
  }

  deleteCustomer(customer: any) {
    this.customerService.deleteCustomer(customer.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  loadCustomer(customer: any) {
    this.router.navigate(['/add'], { queryParams: { id: customer.id } });
  }
}
