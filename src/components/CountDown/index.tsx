import moment from "moment";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

import "moment-duration-format";
import { MOMENTJS_LANGUAGES } from "@/constants/locale";
import { isNumeric } from "@/utils/converter";

export const calculateDuration = (eventTime: string | number) => {
  if (typeof eventTime != "string") {
    eventTime = eventTime.toString();
  }

  if (eventTime.length == 10) {
    eventTime += "000";
  }

  const time = isNumeric(eventTime) ? Number(eventTime) : eventTime;
  return moment.duration(moment(time).diff(moment()));
};

export const DurationLabel = ({
  eventTime,
  className,
  startContent,
}: {
  eventTime?: string | number;
  className?: any;
  extStyles?: any;
  startContent?: any;
}) => {
  const locale = useLocale();
  const locales = MOMENTJS_LANGUAGES as Record<string, string>;

  if (!eventTime) {
    return <></>;
  }

  const dv = calculateDuration(eventTime!).locale(locales[locale]);

  const duration =
    dv.hours() > 1
      ? moment
          .duration({
            days: dv.days(),
            hours: dv.hours(),
          })
          .format("D [days] H [hours]")
      : dv.humanize(true);
  return (
    <div className={className}>
      {startContent}
      {duration}
    </div>
  );
};

const CountDown = ({
  eventTime,
  interval = 1000,
  countAt = 60,
  outdateText = "Ended",
  showOutdate = false,
  className = "",
  extStyles,
  startContent,
}: {
  eventTime: string | number;
  interval?: number;
  countAt?: number;
  outdateText?: string;
  showOutdate?: boolean;
  className?: any;
  extStyles?: any;
  startContent?: any;
}) => {
  const [duration, setDuration] = useState(calculateDuration(eventTime));
  const locale = useLocale();

  const seconds = duration.asSeconds();
  const minutes = duration.asMinutes();

  useEffect(() => {
    if (seconds > 0 && minutes < countAt) {
      setTimeout(() => {
        setDuration(calculateDuration(eventTime));
      }, interval);
    }
  });

  const getText = () => {
    let text;
    const locales = MOMENTJS_LANGUAGES as Record<string, string>;
    if (seconds > 0) {
      if (minutes < countAt) {
        text = duration.locale(locales[locale]).format("m _ s _", 0);
      } else {
        text = duration.locale(locales[locale]).humanize();
      }
    } else {
      if (showOutdate) {
        text = duration.locale(locales[locale]).humanize(true);
      } else {
        text = outdateText;
      }
    }
    return text;
  };

  const getExtClass = () => {
    let progress = "";
    if (extStyles) {
      if (seconds <= 0) {
        progress = extStyles.outdate;
      } else if (minutes < countAt) {
        progress = extStyles.running;
      }
    }
    return progress;
  };

  return (
    <div className={`${className} ${getExtClass()}`}>
      {startContent}
      {getText()}
    </div>
  );
};

export default CountDown;
