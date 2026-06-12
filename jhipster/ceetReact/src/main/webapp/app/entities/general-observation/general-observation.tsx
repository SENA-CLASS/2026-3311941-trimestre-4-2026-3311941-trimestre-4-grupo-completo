import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './general-observation.reducer';

export const GeneralObservation = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const generalObservationList = useAppSelector(state => state.generalObservation.entities);
  const loading = useAppSelector(state => state.generalObservation.loading);
  const totalItems = useAppSelector(state => state.generalObservation.totalItems);

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
      <h2 id="general-observation-heading" data-cy="GeneralObservationHeading">
        <Translate contentKey="ceetApp.generalObservation.home.title">General Observations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ceetApp.generalObservation.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/general-observation/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ceetApp.generalObservation.home.createLabel">Create new General Observation</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {generalObservationList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ceetApp.generalObservation.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('number')}>
                  <Translate contentKey="ceetApp.generalObservation.number">Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('number')} />
                </th>
                <th className="hand" onClick={sort('observationGeneral')}>
                  <Translate contentKey="ceetApp.generalObservation.observationGeneral">Observation General</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('observationGeneral')} />
                </th>
                <th className="hand" onClick={sort('jury')}>
                  <Translate contentKey="ceetApp.generalObservation.jury">Jury</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('jury')} />
                </th>
                <th className="hand" onClick={sort('dateAudit')}>
                  <Translate contentKey="ceetApp.generalObservation.dateAudit">Date Audit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateAudit')} />
                </th>
                <th>
                  <Translate contentKey="ceetApp.generalObservation.projectGroup">Project Group</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ceetApp.generalObservation.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {generalObservationList.map(generalObservation => (
                <tr key={`entity-${generalObservation.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/general-observation/${generalObservation.id}`} variant="link" size="sm">
                      {generalObservation.id}
                    </Button>
                  </td>
                  <td>{generalObservation.number}</td>
                  <td>{generalObservation.observationGeneral}</td>
                  <td>{generalObservation.jury}</td>
                  <td>
                    {generalObservation.dateAudit ? (
                      <TextFormat type="date" value={generalObservation.dateAudit} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {generalObservation.projectGroup ? (
                      <Link to={`/project-group/${generalObservation.projectGroup.id}`}>{generalObservation.projectGroup.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {generalObservation.customer ? (
                      <Link to={`/customer/${generalObservation.customer.id}`}>{generalObservation.customer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        as={Link as any}
                        to={`/general-observation/${generalObservation.id}`}
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
                        to={`/general-observation/${generalObservation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (globalThis.location.href = `/general-observation/${generalObservation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="ceetApp.generalObservation.home.notFound">No General Observations found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={generalObservationList && generalObservationList.length > 0 ? '' : 'd-none'}>
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

export default GeneralObservation;
