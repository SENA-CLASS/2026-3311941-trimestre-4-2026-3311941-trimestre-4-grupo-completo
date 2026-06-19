import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './modality.reducer';

export const ModalityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const modalityEntity = useAppSelector(state => state.modality.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="modalityDetailsHeading">
          <Translate contentKey="ceet2App.modality.detail.title">Modality</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{modalityEntity.id}</dd>
          <dt>
            <span id="modalityName">
              <Translate contentKey="ceet2App.modality.modalityName">Modality Name</Translate>
            </span>
          </dt>
          <dd>{modalityEntity.modalityName}</dd>
          <dt>
            <span id="modalityColor">
              <Translate contentKey="ceet2App.modality.modalityColor">Modality Color</Translate>
            </span>
          </dt>
          <dd>{modalityEntity.modalityColor}</dd>
          <dt>
            <span id="modalityState">
              <Translate contentKey="ceet2App.modality.modalityState">Modality State</Translate>
            </span>
          </dt>
          <dd>{modalityEntity.modalityState}</dd>
        </dl>
        <Button as={Link as any} to="/modality" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/modality/${modalityEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ModalityDetail;
