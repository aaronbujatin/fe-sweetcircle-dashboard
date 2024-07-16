import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component')
            },
            {
                path: 'orders',
                loadComponent: () => import('./business/order/order.component')
            },
            {
                path: 'customers',
                loadComponent: () => import('./business/customers/customers.component')
            },
            {
                path: 'foods',
                loadComponent: () => import('./business/food/food.component')
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/table/table.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
