import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project-phase.reducer';

export const ProjectPhaseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const projectPhaseEntity = useAppSelector(state => state.projectPhase.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectPhaseDetailsHeading">
          <Translate contentKey="ceetApp.projectPhase.detail.title">ProjectPhase</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectPhaseEntity.id}</dd>
          <dt>
            <span id="projectPhaseCode">
              <Translate contentKey="ceetApp.projectPhase.projectPhaseCode">Project Phase Code</Translate>
            </span>
          </dt>
          <dd>{projectPhaseEntity.projectPhaseCode}</dd>
          <dt>
            <span id="projectPhaseState">
              <Translate contentKey="ceetApp.projectPhase.projectPhaseState">Project Phase State</Translate>
            </span>
          </dt>
          <dd>{projectPhaseEntity.projectPhaseState}</dd>
          <dt>
            <Translate contentKey="ceetApp.projectPhase.project">Project</Translate>
          </dt>
          <dd>{projectPhaseEntity.project ? projectPhaseEntity.project.projectCode : ''}</dd>
        </dl>
        <Button as={Link as any} to="/project-phase" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/project-phase/${projectPhaseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectPhaseDetail;
