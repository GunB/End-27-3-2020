import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify';
import { STATUS_LIST } from '../constants/transactionStatus';

const TransactionStatusBadge = ({ status = "", currentTheme}) => {

    const statusList = [...STATUS_LIST]

    const selectStatus = (status) => {
        let result = statusList[0];
        statusList.map((statusElement) => {
            if (RegExp(statusElement.list.join("|"), "i").test(status.toLowerCase())) {
                result = statusElement;
            }
        })
        const { key, badge, className } = result
        return { key, badge, className };
    }

    return (() => {
        const newStatus = selectStatus(status);
        return <div className="o-transaction-badge mt-5">
            <p className={`ribbon ${newStatus.className}`}>
                <span className="text" style={{ color: currentTheme.primary_color_text_over }}>
                    {newStatus.badge}
                    <strong className="pl-2">{I18n.t(status)}</strong>
                </span>
            </p>
        </div>
    })();
}

TransactionStatusBadge.propTypes = {
    status: PropTypes.string
}

export default TransactionStatusBadge;