import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {
//   ButtonModule,
//   ConfirmDialogModule,
//   DialogModule,
//   FileUploadModule,
//   IconFieldModule,
//   InputIconModule,
//   InputNumberModule,
//   InputTextModule,
//   PaginatorModule,
//   RadioButtonModule,
//   RatingModule,
//   SelectModule,
//   TableModule,
//   TagModule,
//   ToolbarModule,
//   TextareaModule,
//   ToastModule,
// } from 'primeng';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

interface Product {
  id?: string;
  code?: string;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
  rating?: number;
  inventoryStatus?: string;
  quantity?: number;
  description?: string;
}

@Component({
  selector: 'app-product-table.component',
  imports: [
    CommonModule,
    FormsModule,
    // PrimeNG modules
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    TagModule,
    RatingModule,
    SelectModule,
    RadioButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
    PaginatorModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  // ✅ Dummy product data using signal
  products = signal<Product[]>([
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      rating: 5,
      inventoryStatus: 'INSTOCK',
      quantity: 24,
      description: 'Product Description',
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      rating: 4,
      inventoryStatus: 'LOWSTOCK',
      quantity: 8,
      description: 'Product Description',
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      rating: 3,
      inventoryStatus: 'OUTOFSTOCK',
      quantity: 0,
      description: 'Product Description',
    },
  ]);

  // ✅ Selected items and dialog signals
  selectedProducts = signal<Product[]>([]);
  productDialog = signal(false);
  submitted = signal(false);

  product = signal<Product>({});
  statuses = [
    { label: 'INSTOCK' },
    { label: 'LOWSTOCK' },
    { label: 'OUTOFSTOCK' },
  ];

  // ✅ Actions
  openNew() {
    this.product.set({});
    this.submitted.set(false);
    this.productDialog.set(true);
  }

  hideDialog() {
    this.productDialog.set(false);
    this.submitted.set(false);
  }

  saveProduct() {
    this.submitted.set(true);
    const newProduct = this.product();

    console.log('newProduct added: ');
    console.log(newProduct);

    if (!newProduct.name?.trim()) return;

    if (newProduct.id) {
      // Update
      this.products.update((list) =>
        list.map((p) => (p.id === newProduct.id ? newProduct : p))
      );
    } else {
      // Add new
      newProduct.id = Date.now().toString();
      newProduct.image = 'bamboo-watch.jpg';
      this.products.update((list) => [...list, newProduct]);
    }

    this.productDialog.set(false);
    this.product.set({});
  }

  editProduct(product: Product) {
    this.product.set({ ...product });
    this.productDialog.set(true);
  }

  deleteProduct(product: Product) {
    this.products.update((list) => list.filter((p) => p.id !== product.id));
  }

  deleteSelectedProducts() {
    const selected = this.selectedProducts();
    if (!selected.length) return;
    const ids = selected.map((p) => p.id);
    this.products.update((list) => list.filter((p) => !ids.includes(p.id)));
    this.selectedProducts.set([]);
  }

  exportCSV() {
    // Just for demo
    console.log('Exporting CSV...', this.products());
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
