interface Avatar {
  name: string;
  avatarUrl?: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  limit?: number;
}

export default function AvatarGroup({ avatars, limit = 3 }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, limit);
  const remainingCount = avatars.length - limit;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getFallbackAvatar = (name: string) => {
    // Use avataaars style instead of initials for more personality
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  };

  return (
    <div className="flex -space-x-1">
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative w-7 h-7 rounded-full ring-[1.5px] ring-white bg-gray-100"
          title={avatar.name}
        >
          <img
            src={avatar.avatarUrl || getFallbackAvatar(avatar.name)}
            alt={avatar.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== getFallbackAvatar(avatar.name)) {
                img.src = getFallbackAvatar(avatar.name);
              }
            }}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div 
          className="w-7 h-7 rounded-full ring-[1.5px] ring-white bg-gray-100 flex items-center justify-center"
          title={`${remainingCount} more`}
        >
          <span className="text-xs font-medium text-gray-600">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
} 