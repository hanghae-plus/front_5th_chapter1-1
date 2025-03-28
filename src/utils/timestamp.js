// utils.js
export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  // 시간 간격 계산
  const intervals = {
    년: 31536000,
    달: 2592000,
    주: 604800,
    일: 86400,
    시간: 3600,
    분: 60,
    초: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} 전` : `${interval} ${unit} 전`;
    }
  }

  return "방금 전";
};
