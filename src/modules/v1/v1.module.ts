import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import { AlertsModule } from './alerts/alerts.module';
import { SectorsModule } from './sector/sectors.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { SquadsModule } from './squads/squads.module';
import { VehiclesModule } from './vehicles/vehicles.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/users', module: UsersModule },
      { path: '/alerts', module: AlertsModule },
      { path: '/sectors', module: SectorsModule },
      { path: '/chats', module: ChatsModule },
      { path: '/auth', module: AuthModule },
      { path: '/activities', module: ActivitiesModule },
      { path: '/squads', module: SquadsModule },
      { path: '/vehicles', module: VehiclesModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    UsersModule,
    AuthModule,
    AlertsModule,
    SectorsModule,
    ChatsModule,
    ActivitiesModule,
    SquadsModule,
    VehiclesModule,
  ],
})
export default class V1Module {}
