import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bonding-competence.reducer';

export const BondingCompetenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const bondingCompetenceEntity = useAppSelector(state => state.bondingCompetence.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bondingCompetenceDetailsHeading">
          <Translate contentKey="ceetApp.bondingCompetence.detail.title">BondingCompetence</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bondingCompetenceEntity.id}</dd>
          <dt>
            <Translate contentKey="ceetApp.bondingCompetence.bondingInstructor">Bonding Instructor</Translate>
          </dt>
          <dd>{bondingCompetenceEntity.bondingInstructor ? bondingCompetenceEntity.bondingInstructor.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.bondingCompetence.learningCompetence">Learning Competence</Translate>
          </dt>
          <dd>{bondingCompetenceEntity.learningCompetence ? bondingCompetenceEntity.learningCompetence.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/bonding-competence" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/bonding-competence/${bondingCompetenceEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BondingCompetenceDetail;
