import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './training-program.reducer';

export const TrainingProgram = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const trainingProgramList = useAppSelector(state => state.trainingProgram.entities);
  const loading = useAppSelector(state => state.trainingProgram.loading);
  const totalItems = useAppSelector(state => state.trainingProgram.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const { order } = paginationState;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="training-program-heading" data-cy="TrainingProgramHeading">
        <Translate contentKey="ceetApp.trainingProgram.home.title">Training Programs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ceetApp.trainingProgram.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/training-program/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ceetApp.trainingProgram.home.createLabel">Create new Training Program</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {trainingProgramList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ceetApp.trainingProgram.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('programCode')}>
                  <Translate contentKey="ceetApp.trainingProgram.programCode">Program Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('programCode')} />
                </th>
                <th className="hand" onClick={sort('programVersion')}>
                  <Translate contentKey="ceetApp.trainingProgram.programVersion">Program Version</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('programVersion')} />
                </th>
                <th className="hand" onClick={sort('programName')}>
                  <Translate contentKey="ceetApp.trainingProgram.programName">Program Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('programName')} />
                </th>
                <th className="hand" onClick={sort('programInitials')}>
                  <Translate contentKey="ceetApp.trainingProgram.programInitials">Program Initials</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('programInitials')} />
                </th>
                <th className="hand" onClick={sort('programState')}>
                  <Translate contentKey="ceetApp.trainingProgram.programState">Program State</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('programState')} />
                </th>
                <th>
                  <Translate contentKey="ceetApp.trainingProgram.levelEducation">Level Education</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {trainingProgramList.map(trainingProgram => (
                <tr key={`entity-${trainingProgram.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/training-program/${trainingProgram.id}`} variant="link" size="sm">
                      {trainingProgram.id}
                    </Button>
                  </td>
                  <td>{trainingProgram.programCode}</td>
                  <td>{trainingProgram.programVersion}</td>
                  <td>{trainingProgram.programName}</td>
                  <td>{trainingProgram.programInitials}</td>
                  <td>
                    <Translate contentKey={`ceetApp.StateProgram.${trainingProgram.programState}`} />
                  </td>
                  <td>
                    {trainingProgram.levelEducation ? (
                      <Link to={`/level-education/${trainingProgram.levelEducation.id}`}>{trainingProgram.levelEducation.levelName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        as={Link as any}
                        to={`/training-program/${trainingProgram.id}`}
                        variant="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/training-program/${trainingProgram.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/training-program/${trainingProgram.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        variant="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ceetApp.trainingProgram.home.notFound">No Training Programs found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={trainingProgramList && trainingProgramList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TrainingProgram;
