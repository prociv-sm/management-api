import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Alert } from './schemas/alert.entity';
import { AlertsService } from './alerts.service';
import { Logger } from '@nestjs/common';

@Processor('alerts')
export class AlertsConsumer {
  constructor(private readonly alertsService: AlertsService) {}

  private readonly logger = new Logger(AlertsConsumer.name);

  /**
   * Process incoming job to create or update alert
   * @param job
   */
  @Process()
  async createNewAlerts(job: Job<Alert>) {
    const { data } = job;
    this.logger.log(`Incoming on alerts queue: ${JSON.stringify(data)}`);
    // Find if alert already exists
    const alert = await this.alertsService.findByLocationIdentifierAndType(
      data.location_code,
      data.identifier,
      data.type,
    );
    if (alert) {
      this.logger.debug(
        `Alert already exists with id ${alert.id}, updating with new data`,
      );
      await this.alertsService.update(alert.id, {
        type: data.type,
        event: data.event,
        urgency: data.urgency,
        location_code: data.location_code,
        severity: data.severity,
        certainty: data.certainty,
        onset: data.onset,
        expires: data.expires,
        received: data.received,
      });
      return;
    }
    this.logger.log(
      `Creating a new alert for location ${data.location_code} and type ${data.type}`,
    );
    await this.alertsService.create(data);
  }

  /**
   * Log when job is completed
   * @param job
   */
  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.debug(`Processing alert job completed: ${job.returnvalue}`);
  }

  /**
   * Log when job fails
   * @param job
   * @param error
   */
  @OnQueueError()
  onError(job: Job, error: Error) {
    this.logger.error(`Processing alert job failed: ${error.message}`);
  }
}
