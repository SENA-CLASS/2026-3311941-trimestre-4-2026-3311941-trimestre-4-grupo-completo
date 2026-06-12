import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project-activity.reducer';

export const ProjectActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const projectActivityEntity = useAppSelector(state => state.projectActivity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectActivityDetailsHeading">
          <Translate contentKey="ceetApp.projectActivity.detail.title">ProjectActivity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectActivityEntity.id}</dd>
          <dt>
            <span id="activityNumber">
              <Translate contentKey="ceetApp.projectActivity.activityNumber">Activity Number</Translate>
            </span>
          </dt>
          <dd>{projectActivityEntity.activityNumber}</dd>
          <dt>
            <span id="activityDescription">
              <Translate contentKey="ceetApp.projectActivity.activityDescription">Activity Description</Translate>
            </span>
          </dt>
          <dd>{projectActivityEntity.activityDescription}</dd>
          <dt>
            <span id="projectActivityState">
              <Translate contentKey="ceetApp.projectActivity.projectActivityState">Project Activity State</Translate>
            </span>
          </dt>
          <dd>{projectActivityEntity.projectActivityState}</dd>
          <dt>
            <Translate contentKey="ceetApp.projectActivity.projectPhase">Project Phase</Translate>
          </dt>
          <dd>{projectActivityEntity.projectPhase ? projectActivityEntity.projectPhase.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/project-activity" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/project-activity/${projectActivityEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectActivityDetail;
