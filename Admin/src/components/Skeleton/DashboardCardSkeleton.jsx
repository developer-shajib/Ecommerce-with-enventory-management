import Skeleton from 'react-loading-skeleton';

const DashboardCardSkeleton = () => {
  return (
    <div className='col-xl-3 col-sm-6 col-12'>
      <div className='card'>
        <div className='card-body'>
          <div className='dash-widget-header'>
            <span className='dash-widget-icon  '>
              <Skeleton
                circle={true}
                // width={40}
                // height={40}
              />
            </span>
            <div className='dash-count'>
              <h3>
                <Skeleton />
              </h3>
            </div>
          </div>
          <div className='dash-widget-info'>
            <h6 className='text-muted'>
              <Skeleton />
            </h6>
            <div className='progress progress-sm'>
              <Skeleton className='progress-bar bg-primary w-50' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;
