import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './general-observation.reducer';

export const GeneralObservationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const generalObservationEntity = useAppSelector(state => state.generalObservation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="generalObservationDetailsHeading">
          <Translate contentKey="ceetApp.generalObservation.detail.title">GeneralObservation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{generalObservationEntity.id}</dd>
          <dt>
            <span id="number">
              <Translate contentKey="ceetApp.generalObservation.number">Number</Translate>
            </span>
          </dt>
          <dd>{generalObservationEntity.number}</dd>
          <dt>
            <span id="observationGeneral">
              <Translate contentKey="ceetApp.generalObservation.observationGeneral">Observation General</Translate>
            </span>
          </dt>
          <dd>{generalObservationEntity.observationGeneral}</dd>
          <dt>
            <span id="jury">
              <Translate contentKey="ceetApp.generalObservation.jury">Jury</Translate>
            </span>
          </dt>
          <dd>{generalObservationEntity.jury}</dd>
          <dt>
            <span id="dateAudit">
              <Translate contentKey="ceetApp.generalObservation.dateAudit">Date Audit</Translate>
            </span>
          </dt>
          <dd>
            {generalObservationEntity.dateAudit ? (
              <TextFormat value={generalObservationEntity.dateAudit} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ceetApp.generalObservation.projectGroup">Project Group</Translate>
          </dt>
          <dd>{generalObservationEntity.projectGroup ? generalObservationEntity.projectGroup.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.generalObservation.customer">Customer</Translate>
          </dt>
          <dd>{generalObservationEntity.customer ? generalObservationEntity.customer.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/general-observation" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/general-observation/${generalObservationEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GeneralObservationDetail;
