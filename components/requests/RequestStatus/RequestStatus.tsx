import Badge, { type BadgeType } from "@/components/ui/Badge";
import type { RequestStatusValue } from "@/components/requests/data";

interface RequestStatusConfig {
  label: string;
  type: BadgeType;
}

/**
 * Correspondencia estado → variante existente del Badge (§5.7):
 * - `pending`  → `pending`
 * - `approved` → `success`
 * - `canceled` → `canceled`
 */
const STATUS_CONFIG: Record<RequestStatusValue, RequestStatusConfig> = {
  pending: { label: "Pendiente", type: "pending" },
  approved: { label: "Aprobada", type: "success" },
  canceled: { label: "Cancelada", type: "canceled" },
};

export interface RequestStatusProps {
  status: RequestStatusValue;
}

/**
 * Estado de una solicitud: delega el color, la forma y el indicador en el
 * Badge del UI Kit (sin duplicar su lógica visual).
 */
export default function RequestStatus({ status }: RequestStatusProps) {
  const { label, type } = STATUS_CONFIG[status];

  return (
    <Badge type={type} showIndicator>
      {label}
    </Badge>
  );
}
