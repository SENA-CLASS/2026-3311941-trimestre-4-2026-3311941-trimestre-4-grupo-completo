import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project.reducer';

export const ProjectDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const projectEntity = useAppSelector(state => state.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">
          <Translate contentKey="ceetApp.project.detail.title">Project</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="projectCode">
              <Translate contentKey="ceetApp.project.projectCode">Project Code</Translate>
            </span>
          </dt>
          <dd>{projectEntity.projectCode}</dd>
          <dt>
            <span id="projectName">
              <Translate contentKey="ceetApp.project.projectName">Project Name</Translate>
            </span>
          </dt>
          <dd>{projectEntity.projectName}</dd>
          <dt>
            <span id="projectState">
              <Translate contentKey="ceetApp.project.projectState">Project State</Translate>
            </span>
          </dt>
          <dd>{projectEntity.projectState}</dd>
          <dt>
            <Translate contentKey="ceetApp.project.trainingProgram">Training Program</Translate>
          </dt>
          <dd>{projectEntity.trainingProgram ? projectEntity.trainingProgram.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/project" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/project/${projectEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
