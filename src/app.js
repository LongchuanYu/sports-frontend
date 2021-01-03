import React from 'react';
import Login from '@/models/login'
export function patchRoutes({ routes }) {
  routes[0].routes.push({
    path: '*',
    component: require('@/pages/404').default,
  });
}
