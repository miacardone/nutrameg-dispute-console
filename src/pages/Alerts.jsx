import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, Badge, Kpi, EmptyState, Button } from '@/components/ui/Surface';
import { DataTable } from '@/components/ui/DataTable';
import { TruncatedText } from '@/components/ui/Overlay';
import Icon from '@/components/ui/Icon';
import { CaseTypeBadge, DueCell } from '@/components/cases/caseColumns';
import { CASES } from '@/data/cases';
import { WEBHOOKS } from '@/data/admin';
import { useBrand } from '@/brand/BrandProvider';
import { ROUTES } from '@/data/navigation';
import { buildConsolidationGroups, consolidationStats, explainGroup } from '@/domain/consolidation';
import { isClosed, getStatus, priorityOf, PRIORITY_TONE } from '@/domain/statuses';
import { caseKpis, ERROR_TYPES, errorHandling } from '@/domain/metrics';
import { formatCompactCurrency, formatCurrency, formatNumber, pluralise } from '@/utils/format';

/**
 * Alerts.
 *
 * One page for everything that needs a human to look at it right now: cases
 * running out of SLA time, high-value cases nobody has picked up, linked-case
 * groups that could pay the same money out twice, and integration health.
 * Every section reads from the same book and rules the rest of the app uses
 * — there is no separate "alerts" fixture that could disagree with the queue.
 */

function PriorityBadge({ caseRecord, riskAmount }) {
  const p = priorityOf(caseRecord, riskAmount);
  const LABEL = { critical: 'Critical', high: 'High', normal: 'Normal', low: 'Low' };
  return <Badge tone={PRIORITY_TONE[p]}>{LABEL[p]}</Badge>;
}

function caseColumns({ brand, priority }) {
  const cols = [
    { key: 'id', header: 'Case', fw: 8, cell: (r) => <span className="mono strong nowrap">{r.id}</span> },
    { key: 'caseType', header: 'Type', fw: 5, cell: (r) => <CaseTypeBadge caseType={r.caseType} /> },
  ];
  if (priority) {
    cols.push({ key: 'priority', header: 'Priority', fw: 6, cell: (r) => <PriorityBadge caseRecord={r} riskAmount={brand.thresholds.riskAmount} /> });
  }
  cols.push(
    { key: 'queueLabel', header: 'Queue', fw: 11, cell: (r) => <TruncatedText value={r.queueLabel} /> },
    { key: 'disputeAmount', header: 'Amount', fw: 6, align: 'right', cell: (r) => <span className="mono">{formatCurrency(r.disputeAmount, r.currency)}</span> },
    { key: 'worker', header: 'Owner', fw: 8, cell: (r) => (r.worker === '—' ? <span className="subtle">Unassigned</span> : <TruncatedText value={r.worker} className="mono" />) },
    { key: 'dueDate', header: 'Due', fw: 6, cell: (r) => <DueCell dueDate={r.dueDate} /> },
    { key: 'status', header: 'Status', fw: 6, cell: (r) => <Badge tone={getStatus(r.status).tone} dot>{getStatus(r.status).label}</Badge> },
  );
  return cols;
}

function ConsolidationRow({ group, terms, onOpen }) {
  return (
    <div className="alert-row">
      <div className="alert-row__icon">
        <Icon name={group.duplicateRefundRisk ? 'alert' : 'layers'} size={15} />
      </div>
      <div className="alert-row__body">
        <div className="row row--xtight" style={{ flexWrap: 'wrap' }}>
          <span className="small strong">{group.label}</span>
          <Badge tone="neutral">{group.ruleLabel}</Badge>
          {group.duplicateRefundRisk && <Badge tone="danger">Double-refund risk</Badge>}
          {!group.duplicateRefundRisk && group.crossChannel && <Badge tone="warning">Cross-channel</Badge>}
        </div>
        <p className="small subtle" style={{ margin: '4px 0 6px' }}>{explainGroup(group)}</p>
        <div className="row row--xtight" style={{ flexWrap: 'wrap', gap: 6 }}>
          {group.caseIds.map((id) => (
            <button key={id} type="button" className="chip-link" onClick={() => onOpen(id)}>{id}</button>
          ))}
        </div>
      </div>
      <div className="alert-row__meta">
        <span className="mono strong">{formatCompactCurrency(group.totalExposure)}</span>
        <span className="micro subtle">{pluralise(group.size, terms.case, terms.cases)}</span>
      </div>
    </div>
  );
}

export function Alerts() {
  const brand = useBrand();
  const navigate = useNavigate();
  const openTo = (id) => navigate(ROUTES.workCaseDetail(id));

  const openCases = useMemo(() => CASES.filter((c) => !isClosed(c.status)), []);
  const kpis = useMemo(() => caseKpis(CASES), []);

  const slaRisk = useMemo(() => {
    return openCases
      .map((c) => ({ ...c, _priority: priorityOf(c, brand.thresholds.riskAmount) }))
      .filter((c) => c._priority === 'critical' || c._priority === 'high')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 25);
  }, [openCases, brand.thresholds.riskAmount]);

  const highValue = useMemo(() => {
    return openCases
      .filter((c) => c.disputeAmount >= brand.thresholds.routingHighValue && c.worker === '—')
      .sort((a, b) => b.disputeAmount - a.disputeAmount)
      .slice(0, 25);
  }, [openCases, brand.thresholds.routingHighValue]);
  const highValueQueueTotal = useMemo(() => openCases.filter((c) => c.queueId === 'high_value').length, [openCases]);

  const groups = useMemo(() => buildConsolidationGroups(CASES), []);
  const stats = useMemo(() => consolidationStats(CASES, groups), [groups]);
  const riskGroups = useMemo(
    () => groups.filter((g) => g.duplicateRefundRisk || g.crossChannel).slice(0, 10),
    [groups],
  );

  const latestErrors = useMemo(() => errorHandling(CASES, 1)[0], []);
  const errorsThisWeek = ERROR_TYPES.reduce((sum, t) => sum + (latestErrors[t.id] ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Everything that needs a look right now — SLA risk, unattended high-value cases, duplicate-refund exposure and integration health."
      />

      <div className="stack">
        <div className="grid grid--4">
          <Kpi label="Overdue cases" value={formatNumber(kpis.overdueCases)} meta={`of ${formatNumber(kpis.openCases)} open`} />
          <Kpi label="High value, unassigned" value={formatNumber(highValue.length)} meta={`${formatNumber(highValueQueueTotal)} in queue`} />
          <Kpi label="Duplicate-refund exposure" value={formatCompactCurrency(stats.duplicateRefundExposure)} meta={pluralise(stats.duplicateRiskGroups, 'group')} />
          <Kpi label="Integration errors" value={formatNumber(errorsThisWeek)} meta="this week" />
        </div>

        {/* ---------- SLA / overdue risk ---------- */}
        <Card
          title="SLA and overdue risk"
          action={<Badge tone={slaRisk.length ? 'danger' : 'neutral'}>{pluralise(slaRisk.length, 'case')}</Badge>}
          bodyClassName="card__body--flush"
        >
          {slaRisk.length === 0 ? (
            <EmptyState icon="clock" title="Nothing at critical or high priority" hint="Every open case is inside its due-date buffer." />
          ) : (
            <DataTable
              columns={caseColumns({ brand, priority: true })}
              rows={slaRisk}
              rowKey={(r) => r.id}
              onRowClick={(r) => openTo(r.id)}
              density="fit"
            />
          )}
        </Card>

        {/* ---------- High-value review queue ---------- */}
        <Card
          title="High-value review queue"
          action={<Badge tone={highValue.length ? 'warning' : 'neutral'}>{pluralise(highValue.length, 'case')}</Badge>}
          bodyClassName="card__body--flush"
        >
          {highValue.length === 0 ? (
            <EmptyState icon="shield" title="No unattended high-value cases" hint={`Every case at or above ${formatCurrency(brand.thresholds.routingHighValue)} has an owner.`} />
          ) : (
            <DataTable
              columns={caseColumns({ brand, priority: false })}
              rows={highValue}
              rowKey={(r) => r.id}
              onRowClick={(r) => openTo(r.id)}
              density="fit"
            />
          )}
        </Card>

        {/* ---------- Consolidation / duplicate-refund risk ---------- */}
        <Card
          title="Consolidation and duplicate-refund risk"
          action={<Badge tone={riskGroups.length ? 'danger' : 'neutral'}>{pluralise(riskGroups.length, 'group')}</Badge>}
        >
          <p className="small subtle" style={{ margin: '0 0 var(--s-3)' }}>
            {formatNumber(stats.groupCount)} linked groups across the book, flagging {formatNumber(stats.flaggedCases)} cases
            ({stats.flaggedRate.toFixed(1)}%). Shown here: groups where the same {brand.terms.order} is disputed through both
            channels, or a group spans chargeback and claim.
          </p>
          {riskGroups.length === 0 ? (
            <EmptyState icon="layers" title="No duplicate-refund risk detected" hint="No linked group currently spans both intake paths on a shared order." />
          ) : (
            <div className="stack stack--tight">
              {riskGroups.map((g) => (
                <ConsolidationRow key={g.id} group={g} terms={brand.terms} onOpen={openTo} />
              ))}
            </div>
          )}
        </Card>

        {/* ---------- Webhook / integration health ---------- */}
        <Card title="Integration health" action={<Badge tone={errorsThisWeek ? 'warning' : 'neutral'}>{pluralise(errorsThisWeek, 'error')} this week</Badge>}>
          <div className="stack stack--xtight">
            {ERROR_TYPES.map((t) => {
              const count = latestErrors[t.id] ?? 0;
              return (
                <div key={t.id} className="row row--between" style={{ padding: 'var(--s-2) 0', borderBottom: '1px solid var(--c-line)' }}>
                  <div className="row row--xtight">
                    <Badge tone={count ? 'danger' : 'muted'}>{t.http}</Badge>
                    <span className="small strong">{t.label}</span>
                    <span className="small muted">— {t.remedy}</span>
                  </div>
                  <span className="mono small strong">{formatNumber(count)}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 'var(--s-4)' }}>
            <span className="t-section-label">Configured webhooks</span>
            {WEBHOOKS.length === 0 ? (
              <EmptyState
                icon="webhook"
                title="No webhooks configured"
                hint="Case-overdue and consolidation-detected events have nowhere to deliver to yet."
                action={<Button variant="secondary" icon="webhook" onClick={() => navigate(ROUTES.webhooks)}>Go to Webhooks</Button>}
              />
            ) : (
              <div className="stack stack--xtight" style={{ marginTop: 'var(--s-2)' }}>
                {WEBHOOKS.map((w) => (
                  <div key={w.id} className="row row--between" style={{ padding: 'var(--s-2) 0', borderBottom: '1px solid var(--c-line)' }}>
                    <TruncatedText value={`${w.topic} → ${w.endpoint}`} className="mono small" />
                    <Badge tone={w.status === 'Active' ? 'success' : 'muted'} dot>{w.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default Alerts;
